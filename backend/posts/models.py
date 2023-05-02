
# Create your models here.
from django.db import models
from user.models import User
from django.utils import timezone


class Post(models.Model):
    content = models.TextField()
    image = models.ImageField(upload_to='posts/', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likeCount = models.IntegerField(blank=True,null=True)

    # def __str__(self):
    #     return self.content
    
class Like(models.Model):
    islike = models.BooleanField(default=False,blank=True)
    likedby = models.ForeignKey(User,on_delete=models.CASCADE) 
    likedPost = models.ForeignKey(Post,on_delete=models.CASCADE,related_name='liked_post')

