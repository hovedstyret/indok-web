# Generated by Django 3.1.6 on 2021-04-09 10:16

import apps.permissions.models
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="ResponsibleGroup",
            fields=[
                ("uuid", models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=250)),
                (
                    "group",
                    models.OneToOneField(
                        default=apps.permissions.models.hex_uuid_group,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="auth.group",
                    ),
                ),
            ],
        ),
    ]
