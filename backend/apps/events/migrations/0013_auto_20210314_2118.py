# Generated by Django 3.1.2 on 2021-03-14 20:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("organizations", "0016_auto_20210308_2014"),
        ("events", "0012_auto_20210314_2003"),
    ]

    operations = [
        migrations.AlterField(
            model_name="event",
            name="organization",
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="organizations.organization"),
        ),
    ]
