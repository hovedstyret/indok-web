# Generated by Django 3.2.5 on 2021-09-09 16:13

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0011_auto_20210902_1847"),
    ]

    operations = [
        migrations.AlterField(
            model_name="listing",
            name="id",
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID"),
        ),
    ]
