# Generated by Django 4.2 on 2023-05-01 11:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_alter_user_gender'),
        ('posts', '0004_remove_post_p_date_remove_post_u_date_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('islike', models.BooleanField(blank=True, default=False)),
                ('likedPost', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='liked_post', to='posts.post')),
                ('likedby', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.user')),
            ],
        ),
    ]
