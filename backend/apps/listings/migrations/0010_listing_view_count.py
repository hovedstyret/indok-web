# Generated by Django 3.1.8 on 2021-08-24 21:30

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0009_listing_read_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="listing",
            name="view_count",
            field=models.IntegerField(default=0),
        ),
    ]
