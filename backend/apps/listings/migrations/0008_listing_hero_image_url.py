# Generated by Django 3.1.8 on 2021-08-30 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0007_auto_20210729_0923'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='hero_image_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
