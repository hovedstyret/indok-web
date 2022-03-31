from functools import wraps
from typing import TYPE_CHECKING, Callable, Literal, Optional, Type, TypeVar, Union, cast, overload

from django.apps import apps
from django.db import models
from django.db.models import Model
from graphene import ResolveInfo
from typing_extensions import Concatenate, ParamSpec

from decorators.constants import PERMISSION_REQUIRED_ERROR, ResolverSignature

from .helpers import context

if TYPE_CHECKING:
    from apps.users.models import User

R = TypeVar("R")
P = ParamSpec("P")

P_lookup = ParamSpec("P_lookup")
M = TypeVar("M", bound="models.Model")

LookupFn = Callable[Concatenate[ResolveInfo, P_lookup], M]
LookupVariables = tuple[Union[Type[Model], str], tuple[str, ...]]


@overload
def permission_required(
    perms: Union[list[str], str],
    lookup_variables: Optional[LookupVariables] = ...,
    fn: Optional[LookupFn[P_lookup, M]] = ...,
    return_none: Literal[False] = ...,
    **kwargs,
) -> Callable[[ResolverSignature[P, R]], Callable[P, R]]:
    ...


@overload
def permission_required(
    perms: Union[list[str], str],
    lookup_variables: Optional[LookupVariables] = ...,
    fn: Optional[LookupFn] = ...,
    return_none: Literal[True] = ...,
    **kwargs,
) -> Callable[[ResolverSignature[P, R]], Callable[P, Optional[R]]]:
    ...


def permission_required(
    perms: Union[list[str], str],
    lookup_variables: Optional[LookupVariables] = None,
    fn: Optional[LookupFn] = None,
    return_none: bool = False,
    **kwargs,
) -> Callable[[ResolverSignature[P, R]], Callable[P, Union[Optional[R], R]]]:
    """Decorator to check for row level permissions

    Parameters
    ----------
    perms : Union[list[str], str]
        A permission or list of permissions in the format app_label.action_modelname.
    lookup_variables : LookupVariables, optional
        A tuple with: (1) the model which to look up, (2) a series of attribute name,
        parameter name pairs to use for the lookup, by default None
    fn : Callable, optional
        A callable used to retrieve the object for which to check if the user has object permissions.
    return_none : bool, optional, default = False
        If the user does not have the required permissions, return None instead of raising an error.
    accept_global_perms : bool
        Whether global permissions are permitted, i.e. does not require object-level permission, by default False

    Raises
    ------
    SyntaxError
        If the first element of the lookup tuple is a str, but not of the format app_label.ModelClass
    TypeError
        If the first element of the lookup tuple is not of the type str, Model, or ModelClass
    ValueError
        If the lookup variables are not in a attribute name, parameter name format, i.e. of even length
    KeyError
        If the attributes to look up are not part of the wrapped function.
    PermissionError
        If the user does not have the required permissions.
    """

    accept_global_perms = kwargs.pop("accept_global_perms", False)
    any_perm = kwargs.pop("any_perm", False)
    if isinstance(perms, str):
        perms = [perms]

    def decorator(resolver: ResolverSignature[P, R]) -> Callable[P, Union[Optional[R], R]]:
        @wraps(resolver)
        @context(resolver)
        def wrapper(context, *args: P.args, **kwargs: P.kwargs) -> Optional[R]:
            obj = None
            if callable(fn):
                obj = fn(context, *args, **kwargs)

            elif lookup_variables:
                model, lookups = lookup_variables

                if isinstance(model, str):
                    model = cast(Type[models.Model], apps.get_model(model, require_ready=True))

                elif not isinstance(model, Model):
                    raise TypeError(f"{model} should be of the type str or Model, got {type(model)}")

                lookup_dict = {}

                if len(lookups) % 2 != 0:
                    raise ValueError(
                        "The lookups should come in pairs of strings in the format attribute name, parameter name."
                    )

                for lookup, resolver_arg in zip(lookups[::2], lookups[1::2]):
                    if resolver_arg not in kwargs:
                        raise KeyError(f"The argument {resolver_arg} was not passed in the resolver function.")
                    lookup_dict[lookup] = kwargs[resolver_arg]

                obj = model.objects.get(**lookup_dict)

            if has_permissions(
                user=context.user,
                perms=perms,
                obj=obj,
                accept_global_perms=accept_global_perms,
                any_perm=any_perm,
            ):
                return resolver(*args, **kwargs)
            elif return_none:
                return None

            raise PermissionError(PERMISSION_REQUIRED_ERROR)

        return wrapper

    return decorator


def has_permissions(
    user: "User",
    perms: list[str],
    obj: Optional[models.Model] = None,
    accept_global_perms: bool = False,
    any_perm: bool = False,
) -> bool:
    """Check if the user has the required permissions

    Parameters
    ----------
    user : AUTH_USER_MODEL
        The user making the request
    perms : list[str]
        List of permissions in the format app_label.action_model
    obj : optional
        The requested object, by default None
    accept_global_perms : bool, optional
        Whether global permissions are permitted, i.e. does not require object-level permission, by default False
    any_perm : bool, optional
        If permission should be granted if any of the required permissions are valid, by default False

    Returns
    -------
    bool
        True if the user has permission, False otherwise
    """
    return (
        (accept_global_perms and all(user.has_perm(perm) for perm in perms))
        or (any_perm and any(user.has_perm(perm, obj) for perm in perms))
        or all(user.has_perm(perm, obj) for perm in perms)
    )


def permission_required_or_none(
    perms: Union[list[str], str],
    lookup_variables: Optional[LookupVariables] = None,
    fn: Optional[LookupFn] = None,
    **kwargs,
):
    """Wrapper for permission required with return_none = True
    Checks if the user has the required permissions for a given object, returns None if not.

    Parameters
    ----------
    perms : Union[list[str], str]
        [description]
    lookup_variables : Optional[LookupVariables], optional
        [description], by default None
    fn : Optional[LookupFn], optional
        [description], by default None

    Returns
    -------
    None
        If the user does not have the given permission, wrapped function otherwise.
    """
    return permission_required(
        perms=perms,
        lookup_variables=lookup_variables,
        fn=fn,
        return_none=True,
        **kwargs,
    )


def get_resolver_parent(context, parent, *args):
    """Default objectgetter for field resolvers

    Parameters
    ----------
    parent : Model
        The parent resolver

    Returns
    -------
    Model
        The root resolver object, i.e. the object type to which we wish to resolve the field.
    """
    return parent
