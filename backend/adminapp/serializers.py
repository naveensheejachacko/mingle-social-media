from rest_framework import serializers
from user.models import User

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','fullname','gender','email', 'phone_number',)