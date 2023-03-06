# Generated by Django 4.1.5 on 2023-03-06 09:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('hallrecords', '0004_alter_event_phonenumber'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='booker',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='bookings', to=settings.AUTH_USER_MODEL),
        ),
    ]
