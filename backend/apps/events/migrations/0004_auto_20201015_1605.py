# Generated by Django 3.1.1 on 2020-10-15 16:05

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("events", "0003_auto_20201012_1335"),
    ]

    operations = [
        migrations.AlterField(
            model_name="event",
            name="image",
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="event",
            name="location",
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
    ]
