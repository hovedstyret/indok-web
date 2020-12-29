from graphql_jwt.middleware import JSONWebTokenMiddleware


class IndokWebJWTMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        jwt_token = getattr(request, "set_jwt_cookie", None)
        print(f"\n[Middleware] JWT token for response: {jwt_token}")
        if jwt_token:
            print(f"[Middleware] setting jwt cookie")
            response.set_cookie("JWT", jwt_token, max_age=24 * 60 * 60, httponly=True)

        return response
