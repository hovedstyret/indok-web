# Generated by Django 3.1.8 on 2021-08-24 12:46

from typing import TYPE_CHECKING, Type
from django.db import migrations

from apps.permissions.constants import HR_TYPE, PRIMARY_TYPE

if TYPE_CHECKING:
    from apps.organizations import models as org_models
    from apps.permissions import models as perm_models


def move_permission_groups_to_fk(apps, _):
    ResponsibleGroup: Type["perm_models.ResponsibleGroup"] = apps.get_model("permissions", "ResponsibleGroup")
    Organization: Type["org_models.Organization"] = apps.get_model("organizations", "Organization")

    for organization in Organization.objects.all():
        primary_group = organization.primary_group
        hr_group = organization.hr_group

        if primary_group and hr_group:
            primary_group.group_type = PRIMARY_TYPE
            hr_group.group_type = HR_TYPE

            # Name as of this migration
            primary_group.temp_organization = organization
            hr_group.temp_organization = organization

            primary_group.save()
            hr_group.save()

            organization.primary_group = None
            organization.hr_group = None
            organization.save()

    # Delete orphan responsible groups
    ResponsibleGroup.objects.filter(temp_organization=None).delete()


def move_permission_groups_to_one_to_one_field(apps, _):
    Organization: Type["org_models.Organization"] = apps.get_model("organizations", "Organization")
    ResponsibleGroup: Type["perm_models.ResponsibleGroup"] = apps.get_model("permissions", "ResponsibleGroup")

    organization: "org_models.Organization"
    for organization in Organization.objects.all():
        organization.primary_group = ResponsibleGroup.objects.get(
            temp_organization=organization, group_type=PRIMARY_TYPE
        )
        organization.hr_group = ResponsibleGroup.objects.get(temp_organization=organization, group_type=HR_TYPE)
        organization.save()


class Migration(migrations.Migration):
    dependencies = [
        ("permissions", "0004_auto_20210824_1446"),
    ]

    operations = [migrations.RunPython(move_permission_groups_to_fk, move_permission_groups_to_one_to_one_field)]
