# Generated by Django 3.1.2 on 2021-02-04 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("archive", "0003_archivedocument_year"),
    ]

    operations = [
        migrations.AlterField(
            model_name="archivedocument",
            name="year",
            field=models.CharField(default=None, max_length=4, null=True),
        ),
    ]
