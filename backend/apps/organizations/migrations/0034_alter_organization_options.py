# Generated by Django 3.2.16 on 2022-11-21 20:19

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("organizations", "0033_merge_0031_auto_20210909_1813_0032_auto_20210824_1457"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="organization",
            options={"permissions": [("manage_organization", "Can manage organizations, used for admins")]},
        ),
    ]
