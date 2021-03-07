import graphene
from api.auth.dataporten_auth import DataportenAuth
from django.contrib.auth import get_user_model
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


class UpdateUser(graphene.Mutation):
    class Arguments:
        email = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        year = graphene.Int()
        phone_number = graphene.String()
        allergies = graphene.String()

    user = graphene.Field(UserType)

    def mutate(
        self,
        info,
        id,
        email=None,
        first_name=None,
        last_name=None,
        year=None,
        phone_number=None,
        allergies=None,
    ):
        user = get_user_model().objects.get(pk=id)
        first_login = user.first_login
        if first_login:
            if not phone_number:
                raise Exception(
                    "Du må spesifisere et telfonnummer ved første innlogging"
                )
            if year not in range(1, 6):
                raise ValueError("Du må oppgi et gyldig årstrinn")
            if not phone_number.isnumeric:
                raise ValueError("Telefonnummeret må inneholde kun tallsiffer")
            first_login = False

        user.save(
            email=email if email is not None else user.feide_email,
            first_name=first_name if first_name is not None else user.first_name,
            last_name=last_name if last_name is not None else user.last_name,
            year=year if year is not None else user.year,
            phone_number=phone_number
            if phone_number is not None
            else user.phone_number,
            allergies=allergies if allergies is not None else user.allergies,
            first_login=first_login,
        )

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
