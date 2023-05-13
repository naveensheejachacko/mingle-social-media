from django.shortcuts import render
from rest_framework.views import APIView

from .serializers import CommentSerializer, PostSerializer
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
    

@api_view(['DELETE'])
@csrf_exempt
def deletePost(request,id):
    post = Post.objects.filter(id=id).first()
    if post:
        post.delete()
        posts = Post.objects.all().order_by('-created_at')
        data = [{"id": p.id, "content": p.content, "created_at": p.created_at} for p in posts]
        print(data,'llllll')
        return Response(data, status=status.HTTP_200_OK)
    else:
        data = {'error': 'post not found'}
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

    return Response({"data":postSer.data},status=status.HTTP_200_OK)


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


# @api_view(['POST'])
# def addcomments(request,id,id2):
#     print(id,'add comments')
#     print(id2)
#     data = request.data
#     c=data['values']
#     print(c['comment'])
#     comm = Comments.objects.create(post = Post.objects.get(id=id2),user = User.objects.get(id=id),comment = c['comment'])
#     ss = {'hai':'hh'}
#     return Response(ss,status=status.HTTP_200_OK)


@api_view(['POST'])
def addcomments(request, id, id2):
    print(id, 'add comments')
    print(id2)
    data = request.data
    c = data['values']
    comment = c['comment']
    comm = Comments.objects.create(post=Post.objects.get(id=id2), user=User.objects.get(id=id), comment=comment)
    ss = {'hai': 'hh'}
    return Response(ss, status=status.HTTP_200_OK)

@api_view(['GET'])
def getcomments(request,id):
    print("working")
    comment = Comments.objects.filter(post=id).select_related('user').order_by('-id')
    print(comment)
    serializer = CommentSerializer(comment,many=True)
    if serializer.is_valid:
        return Response(serializer.data,status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['POST'])
def deletecomment(request,id):
    comm = Comments.objects.get(id=id).delete()
    data = {'status':'success'}
    return Response(data,status=status.HTTP_200_OK)




#Fetch Particular UserPost
@api_view(['GET'])
def userPost(request,id):
    print("userspost functions///")
    p = Post.objects.filter(user_id=id).order_by("-id")
    userPostSer = PostSerializer(p,many=True)
    return Response({"data":userPostSer.data},status=status.HTTP_200_OK)

