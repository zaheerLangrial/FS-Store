# Generated by Django 4.2.16 on 2024-11-06 11:10

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('product', '0006_remove_claimrequest_product_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='requesting_users',
        ),
        migrations.AddField(
            model_name='product',
            name='requesting_users',
            field=models.ManyToManyField(blank=True, null=True, related_name='requested_users', to=settings.AUTH_USER_MODEL),
        ),
    ]