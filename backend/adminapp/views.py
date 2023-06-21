from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
import json
import base64
import jwt
from posts.serializers import ReprotedPostSerializer,PostSerializer
from posts.models import Report,Post
from user.models import User
from user.serializers import UserSerializer




from rest_framework import generics,permissions
# from rest_framework.permissions import BasePermission
from rest_framework.response import Response
from user.serializers import UserSerializer

from rest_framework import status



from django.contrib.auth import get_user_model
# Create your views here.

# from rest_framework.permissions import BasePermission

# class IsSuperUser(BasePermission):
#     """
#     Allows access only to superusers.
#     """
#     def has_permission(self, request, view):
#         return request.user.is_superuser


from rest_framework.permissions import BasePermission, IsAuthenticated

class IsAuthenticatedOrReadOnly(BasePermission):
    """
    The request is authenticated as a user, or is a read-only request.
    """
    def has_permission(self, request, view):
        return request.method in ['GET', 'HEAD', 'OPTIONS'] or request.user.is_authenticated





class AdminLogin(APIView):

    def post(self, request):
        try:
            email = request.data['email']
            password = request.data['password']

        except:
            return Response({'status': 'Please Give All Details'})

 
        status = 'None'
        User = get_user_model()
        admin = User.objects.filter(is_superuser=True).first()

        if admin and admin.is_superuser:
            if admin.email == email:
                if check_password(password, admin.password):
                    payload = {
                        'email': email,
                        'password': password
                    }
                    enpayload = base64.b64encode(json.dumps(
                        payload).encode('utf-8')).decode('utf-8')
                    jwt_token = jwt.encode(
                        {'payload': enpayload}, 'secret', algorithm='HS256')
                    response = Response(
                        {'status': 'Success', 'payload': payload, 'jwt': jwt_token, 'role': 'admin'})
                    print("admin loggedin")
                    return response

                else:

                    status = 'Wrong Password'
            else:
                print('Wrong email')
                status = "Email is not found"
        else:
            status = 'Not A Admin Account'
        return Response({'status': status})
    

class UserList(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return User.objects.all().exclude(is_superuser=True)


class UserView(APIView):
    def get(self, request, user_id):
        user = get_object_or_404(User, pk=user_id)
        return Response({'is_blocked': user.is_blocked})


class BlockUnblockUserView(APIView):
    def patch(self, request, user_id):
        user = get_object_or_404(User, pk=user_id)
        user.is_blocked = not user.is_blocked
        user.save()
        return Response({'status': 'success'})
    



class ApproveReportView(APIView):
    def patch(self, request, reportId):
        report = get_object_or_404(Report, pk=reportId)
        report.approved = not report.approved
        report.save()
        return Response({'status': 'success'})

class ReportedPosts(generics.ListAPIView):
    serializer_class = ReprotedPostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Report.objects.all()

class rPostView(APIView):
    def get(self, request, reportId):
        report = get_object_or_404(Report, pk=reportId)
        return Response({'approved': report.approved})
    

class PostByIdView(APIView):
    def get(self, request, postId):
        p = get_object_or_404(Post, id=postId)
        userPostSer = PostSerializer(p)
        # print(userPostSer.data,'post detialslssssssssss')
        return Response({"data": userPostSer.data}, status=status.HTTP_200_OK)

