from django.db import models
from django.contrib.auth.models import Group
import uuid


def hex_uuid_group():
    return Group.objects.create(name=uuid.uuid4().hex).id


class ResponsibleGroup(models.Model):
    """
    Recommended workaround to extend the Group model.
    See https://groups.google.com/g/django-developers/c/llQJZUKejXg/discussion
    """

    # To avoid any chance of enumerating groups, we use UUIDs
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4)

    # Django's built in permission group
    group = models.OneToOneField(to=Group, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self) -> str:
        return self.name
