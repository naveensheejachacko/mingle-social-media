# Generated by Django 4.2 on 2023-05-05 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_alter_user_gender'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='fromGoogle',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(blank=True, max_length=5000),
        ),
    ]
