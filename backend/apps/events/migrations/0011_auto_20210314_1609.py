# Generated by Django 3.1.2 on 2021-03-14 15:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('organizations', '0017_organization_users'),
        ('events', '0010_auto_20210301_1834'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='organization',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='events', to='organizations.organization'),
        ),
    ]
