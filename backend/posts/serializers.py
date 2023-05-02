from rest_framework import serializers

from user.serializers import UserSerializer
from .models import Like, Post

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    liked_post = LikeSerializer(many=True,read_only = True)

    class Meta:
        model = Post
        fields = '__all__'
