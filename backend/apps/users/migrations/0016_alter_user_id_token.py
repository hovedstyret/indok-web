# Generated by Django 3.2.5 on 2021-11-01 14:57

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0015_auto_20210924_1619"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="id_token",
            field=models.CharField(blank=True, default="", max_length=8000),
        ),
    ]
