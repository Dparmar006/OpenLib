# Generated by Django 3.1.2 on 2020-10-23 03:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0019_auto_20201023_0911'),
    ]

    operations = [
        migrations.AlterField(
            model_name='books',
            name='file',
            field=models.FileField(upload_to='bookFiles/'),
        ),
    ]
