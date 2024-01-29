# Generated by Django 3.2.20 on 2024-01-22 18:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cars', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('max_guests', models.PositiveIntegerField(default=18)),
                ('internal_price', models.PositiveIntegerField(default=1100)),
                ('internal_price_weekend', models.PositiveIntegerField(default=1100)),
                ('external_price', models.PositiveIntegerField(default=3950)),
                ('external_price_weekend', models.PositiveIntegerField(default=5400)),
            ],
        ),
        migrations.CreateModel(
            name='CarBookingResponsible',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=8)),
                ('email', models.EmailField(max_length=100)),
                ('active', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='CarBookingSemester',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fall_start_date', models.DateField()),
                ('fall_end_date', models.DateField()),
                ('spring_start_date', models.DateField()),
                ('spring_end_date', models.DateField()),
                ('fall_semester_active', models.BooleanField()),
                ('spring_semester_active', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='CarBooking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=8)),
                ('receiver_email', models.EmailField(max_length=100)),
                ('check_in', models.DateField()),
                ('check_out', models.DateField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('internal_participants', models.IntegerField()),
                ('external_participants', models.IntegerField()),
                ('is_tentative', models.BooleanField(default=True)),
                ('is_declined', models.BooleanField(default=False)),
                ('decline_reason', models.TextField(blank=True, default='')),
                ('extra_info', models.TextField(blank=True, default='')),
                ('cars', models.ManyToManyField(to='cars.Car')),
            ],
            options={
                'permissions': [('send_email', 'Can send email'), ('manage_car_booking', 'Can manage car_bookings, used for admins')],
            },
        ),
    ]
