# Generated by Django 3.2.5 on 2021-09-24 14:19

from typing import TYPE_CHECKING, Type
from django.db import migrations

from apps.permissions.constants import INDOK

if TYPE_CHECKING:
    from django.contrib.auth import models
    from apps.users import models as user_models


def set_all_users_to_indok(apps, schema_editor):
    Group: Type["models.Group"] = apps.get_model("auth", "Group")
    User: Type["user_models.User"] = apps.get_model("users", "User")
    indok_group: "models.Group" = Group.objects.get(name=INDOK)
    users = User.objects.all()
    users.update(is_indok=True)
    indok_group.user_set.set(users)


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0014_auto_20210924_1037"),
    ]

    operations = [migrations.RunPython(set_all_users_to_indok, migrations.RunPython.noop)]
