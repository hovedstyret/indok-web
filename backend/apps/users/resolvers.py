from django.conf import settings

from django.contrib.auth import get_user_model
from decorators import staff_member_required
from graphql_jwt.shortcuts import get_token
from django.contrib.auth import logout


class UserResolvers:
    def resolve_user(self, info):
        if isinstance(info.context.user, get_user_model()) and not info.context.user.is_anonymous:
            return info.context.user
        else:
            return None

    @staff_member_required
    def resolve_all_users(self, info):
        return get_user_model().objects.all()

    def resolve_logout(self, info):
        user = info.context.user
        logout(info.context)
        return user.id_token

    if settings.ENVIRONMENT == "test":

        def resolve_auth_token(self, info):
            if settings.ENVIRONMENT == "test":
                try:
                    token = get_token(get_user_model().objects.get(username="eva_student"))
                    info.context.set_jwt_cookie = token
                    return token
                except get_user_model().DoesNotExist:
                    return None
            else:
                raise PermissionError("You do not have the permissions required.")
