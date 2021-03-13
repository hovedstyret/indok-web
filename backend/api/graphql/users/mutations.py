import datetime

import graphene
from api.auth.dataporten_auth import DataportenAuth
from django.core.exceptions import ValidationError
from graphql_jwt.decorators import login_required
from graphql_jwt.shortcuts import get_token

from .types import UserType


class AuthUser(graphene.Mutation):
    class Arguments:
        code = graphene.String()

    token = graphene.String()
    user = graphene.Field(UserType)
    is_indok_student = graphene.Boolean()
    id_token = graphene.String()

    def mutate(self, info, code):
        user, enrolled, id_token = DataportenAuth.authenticate_and_get_user(code=code)

        if enrolled:
            token = get_token(user)
            info.context.set_jwt_cookie = token
        else:
            token = None

        return AuthUser(
            user=user,
            token=token,
            is_indok_student=enrolled,
            id_token=id_token,
        )


class UserInput(graphene.InputObjectType):
    email = graphene.String()
    first_name = graphene.String()
    last_name = graphene.String()
    graduation_year = graphene.Int()
    phone_number = graphene.String()
    allergies = graphene.String()


class UpdateUser(graphene.Mutation):
    class Arguments:
        user_data = UserInput(required=False)

    user = graphene.Field(UserType)

    @login_required
    def mutate(
        self,
        info,
        user_data=None,
    ):
        if user_data is None:
            return None

        user = info.context.user

        if user.first_login:
            user.first_login = True

        graduation_year = user_data.get("graduation_year")
        if graduation_year:
            # Check that graduation year is within the next five years
            # After August, current year should not be allowed, and a new year is allowed
            valid_year = True
            now = datetime.datetime.now()
            if now.month < 8:
                if graduation_year not in range(now.year, now.year + 5):
                    valid_year = False
            else:
                if graduation_year not in range(now.year + 1, now.year + 6):
                    valid_year = False
            if not valid_year:
                raise ValidationError(
                    "Du må oppgi et gyldig avgangsår",
                    params={"graduation_year": graduation_year},
                )

        if not user.email and not user_data.get("email"):
            user.email = user.feide_email

        for k, v in user_data.items():
            setattr(user, k, v)

        # Validate fields
        user.full_clean(exclude=["password"])
        user.save(update_fields=[])

        return UpdateUser(user=user)


class GetIDToken(graphene.Mutation):
    id_token = graphene.String(required=True)

    @login_required
    def mutate(self, info):
        user = info.context.user
        id_token = user.id_token

        return GetIDToken(
            id_token=id_token,
        )
