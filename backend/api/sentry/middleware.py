from typing import NoReturn
from graphql.execution.base import ResolveInfo
from sentry_sdk.api import capture_exception


class SentryMiddleware:
    def on_error(self, error: BaseException) -> NoReturn:
        capture_exception(error)
        raise error

    def resolve(self, next, root, info: ResolveInfo, **args):
        return next(root, info, **args).catch(self.on_error)
