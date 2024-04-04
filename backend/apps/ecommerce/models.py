import uuid

from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models, transaction
from django.db.models import F, Sum
from django.db.models.fields import DateTimeField, UUIDField
from apps.ecommerce.mixins import Sellable
from django.contrib.contenttypes.fields import GenericRelation

# from django.contrib.postgres.fields import ArrayField

from apps.organizations.models import Organization
from apps.users.models import User


class Product(models.Model, Sellable):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=11, decimal_places=2)
    description = models.TextField()
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name="products")
    total_quantity = models.PositiveIntegerField()
    current_quantity = models.PositiveIntegerField(null=True)  # Set to total_quantity upon initialization
    max_buyable_quantity = models.PositiveIntegerField(default=1)
    shop_item = models.BooleanField(default=False)
    products = GenericRelation("ecommerce.Product")

    # Generic foreign key to related product model instance (e.g event model)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    related_object = GenericForeignKey("content_type", "object_id")

    class Meta:
        unique_together = ("content_type", "object_id")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.current_quantity is None:
            self.current_quantity = self.total_quantity
        self.max_buyable_quantity = min(self.max_buyable_quantity, self.total_quantity)
        super().save(*args, **kwargs)

    @classmethod
    def check_and_reserve_quantity(cls, product_id, user: User, quantity: int) -> "Product":
        """
        Check whether a requested quantity may be ordered and if so, reserve that quantity for this request.

        Raises:
            ValueError: If the requested quantity for the given product is not allowed.

        """
        with transaction.atomic():
            # Check if the requested quantity is allowed
            try:
                # Acquire DB lock for the product (no other process can change it)
                product = cls.objects.select_for_update().get(pk=product_id)
            except cls.DoesNotExist:
                raise ValueError("Ugyldig produkt")

            bought_quantity = Order.objects.filter(
                product__id=product_id,
                user=user,
                payment_status__in=[Order.PaymentStatus.CAPTURED, Order.PaymentStatus.RESERVED],
            ).aggregate(bought_quantity=Sum("quantity"))["bought_quantity"]
            bought_quantity = bought_quantity or 0

            if bought_quantity >= product.max_buyable_quantity:
                raise ValueError("Du kan ikke kjøpe mer av dette produktet.")
            elif quantity + bought_quantity > product.max_buyable_quantity:
                raise ValueError("Forespurt antall enheter overskrider tillatt antall.")
            elif quantity > product.current_quantity:
                raise ValueError("Forespurt antall enheter overskrider tilgjengelige antall enheter.")

            # Reserve quantity by updating available quantity
            product.current_quantity = F("current_quantity") - quantity
            product.save()
            product.refresh_from_db()
        return product

    @classmethod
    def restore_quantity(cls, order: "Order"):
        """
        Restore quantity that was reserved by an order that was cancelled or failed.
        Also restore quantity if an order that was already reserved (not captured) was re-attempted.
        """
        with transaction.atomic():
            # Acquire DB lock for the product (no other process can change it)
            product = cls.objects.select_for_update().get(pk=order.product.id)
            product.current_quantity = F("current_quantity") + order.quantity
            product.save()


def get_auth_token() -> str:
    return uuid.uuid4().hex


class Order(models.Model):
    class PaymentStatus(models.TextChoices):
        INITIATED = "INITIATED", "initiated"
        RESERVED = "RESERVED", "reserved"
        CAPTURED = "CAPTURED", "captured"
        CANCELLED = "CANCELLED", "cancelled"
        REFUNDED = "REFUNDED", "refunded"
        FAILED = "FAILED", "failed"
        REJECTED = "REJECTED", "rejected"

    id = UUIDField(primary_key=True, default=uuid.uuid4)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="orders")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="orders")
    quantity = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=11, decimal_places=2)
    payment_status = models.CharField(max_length=255, choices=PaymentStatus.choices, default=PaymentStatus.INITIATED)
    timestamp = DateTimeField(auto_now_add=True)
    auth_token = models.CharField(max_length=32, default=get_auth_token)  # For authenticating Vipps callback
    payment_attempt = models.PositiveIntegerField(default=1)
    delivered_product = models.BooleanField(default=False)

    def __str__(self):
        return f"Order(product={self.product}, user={self.user})"

    @property
    def failed_statuses(self):
        return [self.PaymentStatus.CANCELLED, self.PaymentStatus.FAILED, self.PaymentStatus.REJECTED]


class VippsAccessToken(models.Model):
    """
    Stores access tokens from Vipps to use upon Vipps requests.

    """

    token = models.CharField(primary_key=True, max_length=2048)
    expires_on = DateTimeField()
