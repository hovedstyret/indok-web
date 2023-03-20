from typing import List, Optional, TypedDict, Union

import graphene
from graphene import NonNull
from graphene_django import DjangoObjectType
from decorators import login_required, PermissionDenied

from apps.ecommerce.models import Order, Product
from apps.ecommerce.types import ProductType
from apps.users.models import User

from .models import Category, Event, SignUp

UserAttendance = TypedDict(
    "UserAttendance",
    {"is_signed_up": bool, "is_on_waiting_list": bool, "has_bought_ticket": bool, "position_on_waiting_list": int},
)


def has_bought_ticket(event: Event, user: User) -> bool:
    return (
        event.products.exists()
        and Order.objects.filter(
            product=event.products.get(),
            user=user,
            payment_status__in=[
                Order.PaymentStatus.RESERVED,
                Order.PaymentStatus.CAPTURED,
            ],
        ).exists()
    )


class UserAttendingType(graphene.ObjectType):
    is_signed_up = graphene.Boolean()
    is_on_waiting_list = graphene.Boolean()
    has_bought_ticket = graphene.Boolean()
    position_on_waiting_list = graphene.Int()


class SignUpType(DjangoObjectType):
    has_bought_ticket = graphene.Boolean()
    user_allergies = graphene.String()

    class Meta:
        model = SignUp
        fields = [
            "id",
            "event",
            "user",
            "timestamp",
            "is_attending",
            "extra_information",
            "user_email",
            "user_phone_number",
            "user_grade_year",
        ]

    @staticmethod
    def resolve_user_allergies(parent: SignUp, info) -> str:
        return parent.user.allergies

    @staticmethod
    def resolve_has_bought_ticket(sign_up: SignUp, info) -> bool:
        return has_bought_ticket(sign_up.event, sign_up.user)


def resolve_position_on_waiting_list(event: Event, user: User) -> Optional[int]:
    if event.is_attendable:
        wait_list = event.users_on_waiting_list
        for i in range(len(wait_list)):
            position: int = 1
            if wait_list[i] == user:
                return position
            else:
                position += 1
    # The return statement below should never execute, but just in case it gives a rediculos number.
    return 99999


class EventType(DjangoObjectType):
    user_attendance = graphene.Field(UserAttendingType)
    is_full = graphene.Boolean(source="is_full")
    users_on_waiting_list = graphene.List(NonNull(SignUpType))
    users_attending = graphene.List(NonNull(SignUpType))
    allowed_grade_years = graphene.List(NonNull(graphene.Int))
    available_slots = graphene.Int()
    product = graphene.Field(ProductType)

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "start_time",
            "end_time",
            "location",
            "description",
            "organization",
            "category",
            "image",
            "is_attendable",
            "deadline",
            "publisher",
            "price",
            "signup_open_date",
            "short_description",
            "has_extra_information",
            "binding_signup",
            "contact_email",
        ]

    class PermissionDecorators:
        @staticmethod
        def is_in_event_organization(resolver):
            def wrapper(event: Event, info):
                user = info.context.user
                if user.memberships.filter(organization=event.organization).exists() or user.is_superuser:
                    return resolver(event, info)
                else:
                    raise PermissionDenied(
                        f"Du må være medlem av foreningen {event.organization.name} for å gjøre dette kallet"
                    )

            return wrapper

    @staticmethod
    def resolve_user_attendance(event: Event, info) -> UserAttendance:
        user = info.context.user
        return {
            "is_signed_up": user in event.users_attending,
            "is_on_waiting_list": user in event.users_on_waiting_list,
            "has_bought_ticket": has_bought_ticket(event, user),
            "position_on_waiting_list": resolve_position_on_waiting_list(event, user),
        }

    @staticmethod
    def resolve_allowed_grade_years(event: Event, info) -> List[int]:
        return [int(grade) for grade in event.allowed_grade_years]

    @staticmethod
    @login_required
    @PermissionDecorators.is_in_event_organization
    def resolve_users_on_waiting_list(event: Event, info):
        return SignUp.objects.filter(event=event, user__in=event.users_on_waiting_list, is_attending=True)

    @staticmethod
    @login_required
    @PermissionDecorators.is_in_event_organization
    def resolve_users_attending(event: Event, info):
        return SignUp.objects.filter(event=event, user__in=event.users_attending, is_attending=True)

    @staticmethod
    def resolve_available_slots(event: Event, info) -> Union[int, None]:
        user = info.context.user
        if not user.is_authenticated or not user.memberships.filter(organization=event.organization).exists():
            return None
        return event.available_slots

    @staticmethod
    def resolve_product(event: Event, info) -> Product:
        try:
            return event.products.get()
        except Product.DoesNotExist:
            return None


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = [
            "id",
            "name",
        ]
