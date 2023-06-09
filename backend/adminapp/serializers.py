from rest_framework import serializers
from posts.models import Report
from user.models import User

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','fullname','gender','email', 'phone_number')

class UserdemoSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField()

    class Meta:
        model= User
        fields ='__all__'        
    def get_following(self, obj):
        user_id = self.context['user_id']
        following_users = User.objects.get(id=user_id).following.values_list('following_id', flat=True)
        return obj.id in following_users
    
