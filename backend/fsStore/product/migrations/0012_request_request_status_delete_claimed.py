# Generated by Django 4.2.16 on 2024-11-07 06:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0011_rename_user_product_supplier'),
    ]

    operations = [
        migrations.AddField(
            model_name='request',
            name='request_status',
            field=models.CharField(choices=[('available', 'Available'), ('claimed', 'Claimed'), ('pending', 'Pending')], default='available', max_length=20),
        ),
        migrations.DeleteModel(
            name='Claimed',
        ),
    ]