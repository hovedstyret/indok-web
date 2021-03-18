# Generated by Django 3.1.2 on 2021-03-18 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0032_auto_20210318_1917'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='question_type',
            field=models.CharField(choices=[('Prg', 'Paragraph'), ('ShA', 'Short answer'), ('D-d', 'Drop-down'), ('MCQ', 'Multiple choice'), ('Chb', 'Checkboxes'), ('Sld', 'Slider'), ('FUp', 'File upload')], default='Prg', max_length=20),
        ),
    ]
