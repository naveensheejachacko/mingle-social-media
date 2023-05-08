from django.db import models

class User(models.Model):
    email = models.EmailField(unique=True,blank=False)
    fullname = models.CharField(max_length=255,blank=False)
    phone_number = models.CharField(max_length=15,blank=False)
    password = models.CharField(max_length=5000,blank=True)
    default_image = models.ImageField(upload_to='userImage/', default='userImage/default_profilePic.png')
    default_cover_image = models.ImageField(upload_to='userCover/', default='userCover/default_cover.png')
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
