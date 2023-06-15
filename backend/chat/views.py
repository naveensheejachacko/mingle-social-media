from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from user.models import User
from posts.models import FollowList
from posts.serializers import FollowlistSerializer
from user.serializers import UserSerializer
from rest_framework import status
from.models import Room,Message
from.serializers import RoomSerializers,MessageSerializer
# Create your views here.

@api_view(['GET'])
def chatlists(request,id):
    print('hai inside chat app')
    chats = FollowList.objects.filter(follower = id)
    print(chats)
    seriali = FollowlistSerializer(chats,many = True)
    if seriali.is_valid:
        return Response(seriali.data,status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)
@api_view(['GET'])
def create_or_find_room(request, id1, id2):
    id1 = User.objects.get(id=id1)
    id2 = User.objects.get(id=id2)
    print(id1, id2, 'jjjjjjj')
    
    if request.method == 'GET':
        try:
            room = Room.objects.get(first_person=id1, second_person=id2)
        except Room.DoesNotExist:
            try:
                room = Room.objects.get(first_person=id2, second_person=id1)
            except Room.DoesNotExist:
                room = Room.objects.create(first_person=id1, second_person=id2)
        
        serializer = RoomSerializers(room)  # Pass the room object to the serializer
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getMessages(request,id):
    print('jjaij')
    if request.method == 'GET':
        msg = Message.objects.filter(room=id)
        serializer = MessageSerializer(msg, many=True)
        try:
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_403_FORBIDDEN)
