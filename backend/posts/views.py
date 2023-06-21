from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView

from adminapp.serializers import UserdemoSerializer

from .serializers import CommentSerializer, PostSerializer
from user.serializers import UserSerializer
from django.http import Http404

from rest_framework.response import Response
from rest_framework import status
from user.models import User
from .models import Comments, FollowList, Post, Like, RemovedUser, Report
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

import cloudinary
import cloudinary.uploader
import cloudinary.api


@api_view(['GET'])
def following_list(request, user_id):
    user = User.objects.get(id=user_id)
    following_users = user.following.values_list('following_id', flat=True)
    following_list = User.objects.filter(id__in=following_users)
    serializer = UserdemoSerializer(
        following_list, many=True, context={'user_id': user_id})
    return Response(serializer.data)


@api_view(['GET'])
def followers_list(request, user_id):
    user = User.objects.get(id=user_id)
    followers = user.followers.values_list('follower_id', flat=True)
    followers_list = User.objects.filter(id__in=followers)
    serializer = UserdemoSerializer(
        followers_list, many=True, context={'user_id': user_id})
    return Response(serializer.data)


@api_view(['POST'])
def follow_user(request, user_id, fingId):
    user = User.objects.get(id=user_id)
    following_user = User.objects.get(id=fingId)

    if user == following_user:
        print("checking user id anf fid same")
        return Response({'error': 'You cannot follow yourself'})

    if FollowList.objects.filter(follower=user, following=following_user).exists():
        print("check user already following and delete it")
        unfollow = FollowList.objects.filter(
            follower=user, following=following_user)
        unfollow.delete()
        return Response({'success': 'unfollowed'})
    else:
        print("create followlist")
        follow = FollowList.objects.create(
            follower=user, following=following_user)

    return Response({'success': 'You are now following this user'})


@api_view(['GET'])
def fposts(request, user_id):
    user = User.objects.get(id=user_id)
    following_users = user.following.values_list('following_id', flat=True)
    reported_posts = Report.objects.filter(
        approved=True).values_list('post_id', flat=True)
    posts = Post.objects.filter(Q(user_id__in=following_users) | Q(
        user=user)).exclude(id__in=reported_posts).order_by('-created_at')

    # posts = Post.objects.filter(Q(user_id__in=following_users) | Q(
    #     user=user)).order_by('-created_at')
    postSer = PostSerializer(posts, many=True)
    return Response({'data': postSer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def removeSuggestion(request, userId, suggestionId):
    # Get the user and suggestion objects
    user = User.objects.get(id=userId)
    suggestion = User.objects.get(id=suggestionId)
    # Store the removed user's details in a separate model
    RemovedUser.objects.create(user=user, removed_user=suggestion)
    
    return Response(status=status.HTTP_200_OK)



@api_view(['GET'])
def user_suggestions(request, id):
    user = User.objects.get(id=id)
    following_users = user.following.values_list('following_id', flat=True)
    removed_users = RemovedUser.objects.filter(
        user=user).values_list('removed_user_id', flat=True)
    user_suggestions = User.objects.exclude(
        id__in=following_users).exclude(id__in=removed_users).exclude(id=user.id)
    # print(user_suggestions,'user sugestionss*******')
    serializer = UserdemoSerializer(
        user_suggestions, many=True, context={'user_id': id})
    return Response(serializer.data)


@api_view(['POST'])
@csrf_exempt
def addposts(request, id):
    print(request.user.id, 'llllllll')
    user = User.objects.filter(id=id).first()
    print(id, 'hhh')
    content = request.POST['content']
    image = request.FILES.get('image')
    video = request.FILES.get('video')
    if image:
        upload_result = cloudinary.uploader.upload(
            image,
            folder='posts'
        )
        image_url = upload_result['secure_url']
        post = Post.objects.create(
            image=image_url,
            content=content,
            user=user
        )
        data = {'success': 'success'}
        return Response(data, status=status.HTTP_200_OK)

    elif video:
        upload_result = cloudinary.uploader.upload(
            video,
            resource_type='video',
            folder='posts/videos'
        )
        video_url = upload_result['secure_url']
        post = Post.objects.create(
            video=video_url,
            content=content,
            user=user
        )
        data = {'success': 'success'}
        return Response(data, status=status.HTTP_200_OK)


    elif content:
        post = Post.objects.create(
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
def deletePost(request, id):
    post = Post.objects.filter(id=id).first()
    if post:
        post.delete()
        posts = Post.objects.all().order_by('-created_at')
        data = [{"id": p.id, "content": p.content,
                 "created_at": p.created_at} for p in posts]
        # print(data,'llllll')
        return Response(data, status=status.HTTP_200_OK)
    else:
        data = {'error': 'post not found'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# # @authentication_classes([JWTAuthentication])
# def getPosts(request, user_id):
#     reported_posts = Report.objects.filter(
#         approved=True).values_list('post_id', flat=True)
#     posts = Post.objects.exclude(id__in=reported_posts).exclude(
#         user_id=user_id).order_by('-created_at')
#     # print(p.user.fullname)
#     postSer = PostSerializer(posts, many=True)

#     return Response({'data': postSer.data}, status=status.HTTP_200_OK)

from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

@api_view(['GET'])
def getPosts(request, user_id, page):
    reported_posts = Report.objects.filter(
        approved=True).values_list('post_id', flat=True)
    posts = Post.objects.exclude(id__in=reported_posts).exclude(
        user_id=user_id).order_by('-created_at')

    # Paginate the posts
    paginator = Paginator(posts, 10)  # Assuming 10 posts per page
    posts = paginator.page(page)
    # try:
    #     posts = paginator.page(page)
    # except PageNotAnInteger:
    #     posts = paginator.page(1)
    # except EmptyPage:
    #     return Response({'message': 'No more posts'}, status=status.HTTP_204_NO_CONTENT)  # Return 204 status code
    postSer = PostSerializer(posts, many=True)
    return Response({'data': postSer.data}, status=status.HTTP_200_OK)



@api_view(['POST'])
def reportPost(request, postId, userId):
    post = get_object_or_404(Post, id=postId)
    reporter = get_object_or_404(User, id=userId)
    reason = request.data.get('reason')

    # Create a new report instance
    report = Report(post=post, reporter=reporter, reason=reason)
    report.save()

    # Increment the report_count field of the post
    post.report_count += 1
    post.save()

    return Response({'message': 'Post reported successfully'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def isliked(request, id):
    print('hai isliked function on backend ')
    data = request.data
    user = User.objects.get(id=id)
    print(user)
    post = Post.objects.get(id=data['id'])

    like = Like.objects.filter(Q(likedPost=data['id']) & Q(likedby=user.id))
    if like:
        print('deleted the like that exists')
        like.delete()
    else:

        Like.objects.create(likedby=User.objects.get(
            id=user.id), likedPost=post)
        print('like added ')

    print('success  ')
    return Response({'results': data, })


@api_view(['POST'])
def addcomments(request, id, id2):
    print(id, 'add comments')
    print(id2)
    data = request.data
    c = data['values']
    comment = c['comment']
    comm = Comments.objects.create(post=Post.objects.get(
        id=id2), user=User.objects.get(id=id), comment=comment)
    ss = {'hai': 'hh'}
    return Response(ss, status=status.HTTP_200_OK)


@api_view(['GET'])
def getcomments(request, id):
    print("working")
    comment = Comments.objects.filter(
        post=id).select_related('user').order_by('-id')
    print(comment)
    serializer = CommentSerializer(comment, many=True)
    if serializer.is_valid:
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['POST'])
def deletecomment(request, id):
    comm = Comments.objects.get(id=id).delete()
    data = {'status': 'success'}
    return Response(data, status=status.HTTP_200_OK)


# Fetch Particular UserPost
@api_view(['GET'])
def userPost(request, id):
    print("userspost functions///")
    p = Post.objects.filter(user_id=id).order_by("-id")
    userPostSer = PostSerializer(p, many=True)
    return Response({"data": userPostSer.data}, status=status.HTTP_200_OK)




# @api_view(['GET'])
# def getPostById(request, postId):
#     p = Post.objects.filter(post_id=postId).order_by("-id")
#     userPostSer = PostSerializer(p, many=True)
#     return Response({"data": userPostSer.data}, status=status.HTTP_200_OK)
