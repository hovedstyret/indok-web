# Generated by Django 3.2.12 on 2022-03-11 09:26

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("cabins", "0025_auto_20220310_1827"),
    ]

    operations = [
        migrations.AlterField(
            model_name="booking",
            name="decline_reason",
            field=models.TextField(blank=True, default=""),
        ),
        migrations.AlterField(
            model_name="booking",
            name="extra_info",
            field=models.TextField(blank=True, default=""),
        ),
    ]
