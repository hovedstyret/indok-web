# Generated by Django 3.2.22 on 2024-02-15 17:51

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("ecommerce", "0002_auto_20220120_1911"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="shop_item",
            field=models.BooleanField(default=False),
        ),
    ]