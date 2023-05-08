from django.shortcuts import render
from rest_framework.views import APIView

from .serializers import PostSerializer
from user.serializers import UserSerializer
from django.http import Http404

from rest_framework.response import Response
from rest_framework import status
from user.models import User
from .models import Comments, Post,Like
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.db.models import Q
from rest_framework.permissions import AllowAny, IsAdminUser
from django.contrib.auth import get_user
# from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny


import jwt
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

# class JWTAuthentication(BaseAuthentication):
#     def authenticate(self, request):
#         # Get the JWT token from the request headers
#         auth_header = request.headers.get('Authorization')
#         if not auth_header:
#             return None

#         # The header value should be in the format "Bearer <JWT token>"
#         auth_token = auth_header.split(' ')[1]

#         try:
#             # Verify and decode the token
#             payload = jwt.decode(auth_token, 'secret', algorithms=['HS256'])
#         except jwt.exceptions.DecodeError:
#             raise AuthenticationFailed('Invalid token')

#         # Extract the user ID from the token payload
#         user_id = payload.get('user_id')
#         if not user_id:
#             raise AuthenticationFailed('Invalid token')

#         # Return the authenticated user and token
#         return (user_id, auth_token)


# from django.views.decorators.csrf import csrf_exempt
# from rest_framework_simplejwt.authentication import JWTAuthentication


# # @authentication_classes([JWTAuthentication])
# @csrf_exempt
# def addposts(request,id):
#     print(request.user.id,'llllllll')
#     userid = User.objects.get(id=id)
#     print(id,'hhh')
#     data = request.data
#     print(data)
#     content = request.POST.get('content')
#     post = request.FILES.get('image')
#     print(content)
#     print(post)
#     p =Post(Image=post,content=content,user = userid)
#     p.save()
#     dat = {'success':'okay'}
#     return Response(dat,status=status.HTTP_200_OK)

from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from user.models import User
from .models import Post



@api_view(['POST'])
@csrf_exempt
def addposts(request, id):
    print(request.user.id, 'llllllll')
    user = User.objects.filter(id=id).first()   
    print(id, 'hhh')
    content = request.POST['content']
    image = request.FILES.get('image')
    if content:
        post = Post.objects.create(
            image=image,
            content=content,
            user=user
        )
        data = {'success': 'success'}
        return Response(data, status=status.HTTP_200_OK)
    else:
        data = {'error': 'missing data'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
# @authentication_classes([JWTAuthentication])
def getPosts(request):
    # postukal = Post.objects.all().order_by('-created_at')
    # posts = []
    # posts.append(postukal)
    p = Post.objects.all().order_by('-created_at')
    # print(p.user.fullname)
    postSer = PostSerializer(p,many=True)

    return Response({"data":postSer.data})


@api_view(['POST'])
def isliked(request,id):
    print('hai isliked function on backend ')
    data  = request.data
    user = User.objects.get(id=id)
    print(user)
    post = Post.objects.get(id=data['id'])
    

    like = Like.objects.filter(Q(likedPost=data['id']) & Q(likedby = user.id))
    if like:
        print('deleted the like that exists')
        like.delete()
    else:
        
        Like.objects.create(likedby=User.objects.get(id=user.id),likedPost = post)
        print('like added ')

    print('success  ')
    return Response({'results':data,})


@api_view(['POST'])
def addcomments(request,id,id2):
    print(id,'add comments inside comments f')
    print(id2)
    data = request.data
    c=data['values']
    print(c['comment'])
    comm = Comments.objects.create(post = Post.objects.get(id=id2),user = User.objects.get(id=id),comment = c['comment'])
    ss = {'hai':'hh'}
    return Response(ss,status=status.HTTP_200_OK)
