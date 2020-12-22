import json
import os

import jwt
import requests
from django.contrib.auth import get_user_model
from requests.auth import HTTPBasicAuth

UserModel = get_user_model()

# CLIENT_ID = os.environ.get("DATAPORTEN_ID")
CLIENT_ID = "f17d2ea0-a7c9-4458-83bf-35cf5b555cae"


class DataportenAuth:
    """
    Class implementing the backend part of authenticating a user with Dataporten.
    Upon receiving an authorization code from frontend
    this class completes the authentication by obtaining an access token from Dataporten,
    which can then be used to access user data at Dataporten.
    """

    @staticmethod
    def complete_dataporten_auth(code):
        """
        https://docs.feide.no/service_providers/openid_connect/feide_obtaining_tokens.html
        """
        print("Completing dataporten authentication")
        print(CLIENT_ID)
        params = {
            "code": code,
            "grant_type": "authorization_code",
            # "redirect_uri": os.environ.get("DATAPORTEN_REDIRECT_URI"),
            "redirect_uri": "http://localhost:3000/cb",
        }

        response = requests.post(
            "https://auth.dataporten.no/oauth/token",
            params,
            auth=HTTPBasicAuth(
                CLIENT_ID,
                # os.environ.get("DATAPORTEN_SECRET"),
                "862ac077-2118-4c25-b047-1b99e90a0e9b",
            ),
        )
        if response.status_code == 200:
            print("Successfully obtained access token")
        else:
            print(
                f"ERROR: Got status code {response.status_code} when obtaining access token"
            )
            return None
        
        return response.json()

    @staticmethod
    def validate_response(resp):
        """
        https://docs.feide.no/reference/oauth_oidc/openid_connect_details.html
        """
        if resp is None:
            return None

        print("Validating id_token")
        id_token = resp["id_token"]

        # Collect available public keys, mapping each key's ID to its parsed representation
        jwks = requests.get("https://auth.dataporten.no/openid/jwks").json()
        public_keys = {}
        for jwk in jwks["keys"]:
            kid = jwk["kid"]
            public_keys[kid] = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))

        # look up the public key corresponding to the private key with which the token was signed
        kid = jwt.get_unverified_header(id_token)["kid"]
        key = public_keys[kid]

        try:
            jwt.decode(
                id_token,
                key=key,
                algorithms=["RS256"],
                issuer="https://auth.dataporten.no",
                audience=CLIENT_ID,
            )
        # https://pyjwt.readthedocs.io/en/stable/api.html#exceptions
        except jwt.ExpiredSignatureError:
            print("Signature has expired")
            return False
        except jwt.InvalidAudienceError:
            print(
                "The token’s audience (aud) claim does not match one of the expected audience values"
            )
            return False
        except jwt.InvalidIssuerError:
            print("The token’s issuer (iss) claim does not match the expected issuer")
            return False
        except jwt.InvalidIssuedAtError:
            print("The token’s issued at (iat) claim is in the future")
            return False
        except jwt.ImmatureSignatureError:
            print("The token’s not-before (nbf) claim represents a time in the future")
            return False
        except jwt.InvalidSignatureError:
            print(
                "The token’s signature doesn’t match the one provided as part of the token"
            )
            return False
        except:
            print("ERROR: Unable to validate id_token")
            return False

        print("The id_token was successfully validated")
        return True

    @staticmethod
    def get_user_info(resp):
        """
        https://docs.feide.no/service_providers/openid_connect/oidc_authentication.html
        """
        if resp is None:
            return None

        print("Fetching user info from Dataporten")
        access_token = resp["access_token"]

        params = {
            "Authorization": f"Bearer {access_token}",
        }
        response = requests.get("https://auth.dataporten.no/userinfo", headers=params)
        if response.status_code == 200:
            print("Successfully fecthed user info")
        else:
            print(
                f"ERROR: Got status code {response.status_code} when fetching user info"
            )
            return None

        data = response.json()

        user_info = data["user"]

        username = user_info["userid_sec"][0].split(":")[1].split("@")[0]
        feide_userid = user_info["userid"]
        email = f"{username}@stud.ntnu.no"
        name = user_info["name"]
        year = 4  # TODO: update when access to study year
        return (username, feide_userid, email, name, year)

    @classmethod
    def authenticate_and_get_user(cls, code=None):

        if code is None:
            return None

        # Complete authentication of user
        response = cls.complete_dataporten_auth(code)
        if not cls.validate_response(response):
            return None

        # Fetch user info from Dataporten
        user_info = cls.get_user_info(response)
        if user_info is None:
            return None

        username, feide_userid, email, name, year = user_info

        # TODO: check that user goes to indøk
        try:
            user = UserModel.objects.get(feide_userid=feide_userid)
            # User exists, update user info
            print(f"User {username} exists, updating in the database")
            user.username = username
            user.email = email
            user.first_name = name
            user.feide_userid = feide_userid
            user.year = year
            user.save()

        except UserModel.DoesNotExist:
            print("User does not exist, creating in the database")
            # User does not exist, create a new user
            user = UserModel(
                username=username,
                email=email,
                first_name=name,
                feide_userid=feide_userid,
                year=year,
            )
            user.save()
        return user
