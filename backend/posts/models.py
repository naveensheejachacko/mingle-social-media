
# Create your models here.
from django.db import models
from user.models import User
from django.utils import timezone


class Post(models.Model):
    content = models.TextField()
    image = models.ImageField(upload_to='posts/', null=True, blank=True)
    video = models.FileField(upload_to='posts/videos/', null=True, blank=True)  # Add a video field
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likeCount = models.IntegerField(blank=True,null=True)
    report_count = models.IntegerField(default=0)
    # def __str__(self):
    #     return self.content
    
class Like(models.Model):
    islike = models.BooleanField(default=False,blank=True)
    likedby = models.ForeignKey(User,on_delete=models.CASCADE) 
    likedPost = models.ForeignKey(Post,on_delete=models.CASCADE,related_name='liked_post')


class Comments(models.Model):
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='user_na')
    comment = models.TextField(max_length=255)


class FollowList(models.Model):
    follower = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name='followers', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class RemovedUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    removed_user = models.ForeignKey(User, related_name='removed_by', on_delete=models.CASCADE)
    removed_at = models.DateTimeField(auto_now_add=True)

class Report(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    reporter = models.ForeignKey(User, on_delete=models.CASCADE)
    reason = models.CharField(max_length=255)
    approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
