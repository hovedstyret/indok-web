# Generated by Django 3.1.2 on 2021-03-12 16:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0006_merge_20210312_1745"),
    ]

    operations = [
        migrations.RenameField(
            model_name="user",
            old_name="year",
            new_name="graduation_year",
        ),
    ]
