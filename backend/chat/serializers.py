from rest_framework import serializers
from .models import Room,Message

class RoomSerializers(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields ='__all__'

        
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields ='__all__'