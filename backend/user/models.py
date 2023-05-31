from django.db import models
from django.contrib.auth.hashers import check_password


class User(models.Model):
    email = models.EmailField(unique=True,blank=False)
    fullname = models.CharField(max_length=255,blank=False)
    phone_number = models.CharField(max_length=15,blank=False)
    password = models.CharField(max_length=5000,blank=True)
    profile_picture = models.CharField(max_length=255,blank=True)
    cover_picture = models.CharField(max_length=255,blank=True)
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other')
    )
    gender = models.CharField(max_length=1,default='M' ,choices=GENDER_CHOICES)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_blocked = models.BooleanField(default=False)
    is_anonymous = False
    fromGoogle=models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fullname']


    def __str__(self):
        return self.email
    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
    def update_details(self, fullname, email, phone_number, gender):
        self.fullname = fullname
        self.email = email
        self.phone_number = phone_number
        self.gender = gender
        self.save()