import json

from utils.testing.base import ExtendedGraphQLTestCase
from utils.testing.factories.users import IndokUserFactory


class IntegrationServerTestCase(ExtendedGraphQLTestCase):
    def setUp(self) -> None:
        super().setUp()
        self.indok_user = IndokUserFactory(
            username="eva_student",
            first_name="Eva",
            last_name="Student Åsen",
            email="eva_student@feide.no",
            is_active=True,
            feide_userid="1d6dbc59-4d69-4b40-90c2-2cf9c0936720",
            feide_email="eva_student@feide.no",
            graduation_year=2025,
            is_indok=True,
            first_login=False,
        )
        self.test_auth = """
            query {
                testAuth
            }
        """

    def test_cypress_allowed(self):
        with self.settings(ENVIRONMENT="test"):
            response = self.query(self.test_auth)
            self.assertResponseNoErrors(response)
            user = json.loads(response.content)["data"]["testAuth"]["user"]
            self.assertEqual(user, self.indok_user)

    def test_cypress_disallowed(self):
        with self.settings(ENVIRONMENT="production"):
            response = self.query(self.test_auth)
            self.assert_permission_error(response)
