from rest_framework import serializers

from user.serializers import UserSerializer
from .models import Comments, FollowList, Like, Post, Report

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    liked_post = LikeSerializer(many=True,read_only = True)
    profile_picture = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = '__all__'
    def get_profile_picture(self, obj):
        return obj.user.profile_picture
    
class CommentSerializer(serializers.ModelSerializer):
    user_na = serializers.SerializerMethodField()
    class Meta:
        model = Comments
        fields = 'id','post','user','comment','user_na'

    def get_user_na(self,obj):
        return obj.user.fullname
    



class FollowlistSerializer(serializers.ModelSerializer):
    user = UserSerializer(source='following', read_only=True)
    class Meta:
        model = FollowList
        fields ='__all__'


class ReprotedPostSerializer(serializers.ModelSerializer):
    post = PostSerializer(read_only=True)
    reporter = UserSerializer(read_only=True)
    class Meta:
        model = Report
        fields ='__all__' 