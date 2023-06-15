# # chat/consumers.py
# import json

# from channels.generic.websocket import AsyncWebsocketConsumer

# from user.models import User
# from .models import Message   



# class ChatConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         self.room_name = self.scope['url_route']['kwargs']['room_name']
#         self.sender_id= self.scope['url_route']['kwargs']['user_id']
#         self.sender= User.objects.get(id=self.sender_id)
#         self.room_group_name = 'chat_%s' % self.room_name

#         # Join room group
#         await self.channel_layer.group_add(
#             self.room_group_name, 
#             self.channel_name
#         )

#         await self.accept()

#     async def disconnect(self, close_code):
#         # Leave room group
#         await self.channel_layer.group_discard(
#             self.room_group_name, 
#             self.channel_name)

#     # Receive message from WebSocket
#     async def receive(self, text_data):
#         # text_data_json = json.loads(text_data)
#         # message = text_data_json["message"]

#         Message.objects.create(
#             sender=self.sender,
#             room=self.room_name,
#             message=text_data
#         )

#         # Send message to room group
#         await self.channel_layer.group_send(
#             self.room_group_name, 
#             {"type": "chat_message",
#               "message":text_data}
#         )

#     # Receive message from room group
#     async def chat_message(self, event):
#         # message = event["message"]
#         msg = json.dumps({
#             'message':event['message'],
#             'sender':self.sender.id
#         })
#         await self.send(text_data=msg)
#         # Send message to WebSocket
#         # await self.send(text_data=json.dumps({"message": message}))


from channels.generic.websocket import WebsocketConsumer
from .models import Message   
from asgiref.sync import async_to_sync
from .models import *
import json

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.sender_id= self.scope['url_route']['kwargs']['user_id']
        self.sender= User.objects.get(id=self.sender_id)
        self.room_group_name = 'chat_%s' % self.room_name
        
        # Join the room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave the room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        # Save the message to the database
        Message.objects.create(
            sender=self.sender,
            room=self.room_name,
            message=text_data
        )

        # Send the message to the room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': text_data
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        # message = event['message']
        msg = json.dumps({
                'message':event['message'],
                'sender':self.sender.id
        })
        # Send the message to the WebSocket
        self.send(text_data=msg)
