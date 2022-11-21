# Generated by Django 3.2.16 on 2022-11-14 17:54

from django.db import migrations
from apps.permissions.constants import ADMIN_GROUP_NAME, ADMIN_GROUP_TYPE, MEMBER_GROUP_NAME, MEMBER_GROUP_TYPE


def migrate_org_groups(apps, schema_editor):
    ResponsibleGroup = apps.get_model("permissions", "ResponsibleGroup")
    for group in ResponsibleGroup.objects.all():
        if group.name == "HR":
            group.name == f"{ADMIN_GROUP_NAME}:{group.organization.name}"
            group.group_type == ADMIN_GROUP_TYPE
            group.save()
        if group.name == "Medlem":
            group.name = f"{MEMBER_GROUP_NAME}:{group.organization.name}"
            group.group_type = MEMBER_GROUP_TYPE
            group.save()


class Migration(migrations.Migration):

    dependencies = [
        ("organizations", "0033_merge_0031_auto_20210909_1813_0032_auto_20210824_1457"),
    ]

    operations = [migrations.RunPython(migrate_org_groups)]
