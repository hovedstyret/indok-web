# Generated by Django 3.1.2 on 2020-11-02 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("organizations", "0005_auto_20201010_1028"),
    ]

    operations = [
        migrations.AddField(
            model_name="organization",
            name="color",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
