from rest_framework import serializers
from user.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email','password', 'phone_number', 'gender', 'fullname','is_active','profile_picture')
