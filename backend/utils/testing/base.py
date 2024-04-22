import json
from datetime import datetime
from typing import TYPE_CHECKING, Any, Final, Optional, Union, cast, overload
from django.db.models.query import QuerySet

import factory
from django.db import models
from django.http.response import HttpResponse
from graphene.utils.str_converters import to_snake_case
from graphene_django.utils.testing import GraphQLTestCase
from django.conf import settings
from decorators.constants import PERMISSION_REQUIRED_ERROR

from utils.testing.factories.users import UserFactory

if TYPE_CHECKING:
    from apps.users.models import User

PERMISSION_ERROR_MESSAGE: Final = PERMISSION_REQUIRED_ERROR
ALTERNATE_PERMISSION: Final = "You do not have permission to perform this action"

model = Union[models.Model, factory.Factory]


class ExtendedGraphQLTestCase(GraphQLTestCase):
    def setUp(self) -> None:
        self.GRAPHQL_URL = (
            f"/{settings.GRAPHQL_URL}" if not settings.GRAPHQL_URL.startswith("/") else settings.GRAPHQL_URL
        )
        return super().setUp()

    def query(self, query: str, user: Optional[Union[UserFactory, "User"]] = None, **kwargs) -> HttpResponse:
        headers = {}
        if user is not None:
            user = cast("User", user)
            self.client.force_login(user, backend="django.contrib.auth.backends.ModelBackend")
        return super().query(query, headers=headers, **kwargs)

    def assert_permission_error(self, response: HttpResponse) -> None:
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        self.assertTrue(
            any(
                PERMISSION_ERROR_MESSAGE in error["message"] or ALTERNATE_PERMISSION in error["message"]
                for error in content["errors"]
            ),
            msg=f"Permission error not found in {content.items()}",
        )
        self.assertTrue(
            all(value is None for _, value in content["data"].items()),
            msg=f"Found data in {content['data'].items()}, expected {None}",
        )

    def assert_null_fields(self, data: Union[dict[str, Any], list], fields: list[str]) -> None:
        if isinstance(data, dict):
            for k, v in data.items():
                if k in fields:
                    self.assertIsNone(v)
                elif isinstance(v, (list, dict)):
                    self.assert_null_fields(v, fields)
        elif isinstance(data, list):
            for value in data:
                if value in fields:
                    self.assertIsNone(value)
                elif isinstance(value, (list, dict)):
                    self.assert_null_fields(value, fields)

    def _assert_list_equal(self, data: list[dict[str, Any]], obj: Union[QuerySet[models.Model], list[model]]) -> None:
        for data_item, obj_item in zip(data, obj):
            self.deep_assert_equal(data_item, obj_item)

    def _assert_dict_equal(self, data: dict[str, Any], obj: model) -> None:
        for k, v in data.items():
            if hasattr(obj, to_snake_case(k)):
                value = getattr(obj, to_snake_case(k))
                if isinstance(value, datetime):
                    # Datetimes must be formatted for the comparision
                    self.assertEqual(
                        v,
                        str(value.isoformat()),
                        msg=f"{v=}, {str(value.isoformat())=} failed for key {k=}",
                    )
                elif isinstance(value, (models.Model, factory.Factory)):
                    # Foreign key or a related instance, recursively check the values.
                    self.deep_assert_equal(v, value)
                elif hasattr(value, "all") and callable(value.all) and isinstance(v, list):
                    # Likely a related manager, fetch the objects prior to continuing
                    self.deep_assert_equal(v, value.all())
                else:
                    self.assertEqual(
                        str(v),
                        str(value),
                        msg=f"{str(v)=}, {str(value)=} failed for key {k=}",
                    )

    @overload
    def deep_assert_equal(self, data: dict[str, Any], obj: model) -> None: ...

    @overload
    def deep_assert_equal(self, data: list[dict[str, Any]], obj: Union[QuerySet[models.Model], list[model]]) -> None: ...

    def deep_assert_equal(
        self,
        data: Union[dict[str, Any], list[dict[str, Any]]],
        obj: Union[Union[QuerySet[models.Model], list[model]], model],
    ) -> None:
        """
        Compares the structure of a dictionary from a GraphQL query response to a corresponding object in the database
        Note: When comparing lists, the assertion assumes that the lists are sorted on the same key, otherwise,
        the assertion will fail.

        Parameters
        ----------
        data : Union[dict[str, Any], list[dict[str, Any]]]
            The response data, typically from a GraphQL query
        obj : Union[list[Union[models.Model, factory.Factory]], models.Model, factory.Factory]
            The data instance in the database

        Raises
        ------
        AssertionError
            If the types are unexpected.
        """
        if isinstance(data, list) and isinstance(obj, (QuerySet, list)):
            """
            When comparing lists, we want to compare by item, assumes that the lists are sorted on the same key.
            """
            self._assert_list_equal(data, obj)

        elif isinstance(data, dict) and isinstance(obj, (models.Model, factory.Factory)):
            """
            Comparing a dictionary to an instance of the model. Compare each attribute in the provided dictionary
            to the corresponding value for the instance.
            """
            self._assert_dict_equal(data, obj)

        else:
            raise AssertionError(f"Unexpected types, got {type(data)=} and {type(obj)=}")
