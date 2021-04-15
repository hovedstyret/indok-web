# Generated by Django 3.1.6 on 2021-03-27 11:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("organizations", "0019_merge_20210315_1439"),
        ("events", "0015_merge_20210315_1440"),
    ]

    operations = [
        migrations.AlterField(
            model_name="event",
            name="publisher",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
