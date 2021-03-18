# Generated by Django 3.1.2 on 2021-03-18 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0031_auto_20210318_1709'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='question_type',
            field=models.CharField(choices=[('Paragraph', 'Paragraph'), ('Short answer', 'Short answer'), ('Drop-down', 'Drop-down'), ('Multiple choice', 'Multiple choice'), ('Checkboxes', 'Checkboxes'), ('Slider', 'Slider'), ('File upload', 'File upload')], default='Paragraph', max_length=20),
        ),
    ]
