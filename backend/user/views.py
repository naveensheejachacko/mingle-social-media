from django.core.files import File
from django.shortcuts import get_object_or_404, render

# Create your views here.
import json
import base64
import jwt
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from user.models import User
from django.contrib.auth.hashers import make_password, check_password
from user.serializers import UserSerializer
from rest_framework import status
from rest_framework . exceptions import AuthenticationFailed
from django.db.models import Q



import cloudinary.uploader


@api_view(['GET'])
def getUserById(request, user_id):
    user = get_object_or_404(User, id=user_id)
    data = {
        'username': user.fullname,
        'email': user.email,
        'profile_picture': user.profile_picture,
        'cover_picture': user.cover_picture,
        'id':user.id,
        'phoneNumber':user.phone_number,
        'gender':user.gender,
        # Add any other user details you want to include here
    }
    return Response(data)


class SignUp(APIView):
    def post(self, request):
        try:

            data = request.data
            print(data)
            fullname = data['fullname']
            print(fullname)
            email = data['email']
            phone_number = data['phone_number']
            gender = data['gender']

            if User.objects.filter(email=email).exists():
                message = "email already exists"
                status = "email exists"
                return Response({'status': status})
                # return Response(message, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(phone_number=phone_number).exists():
                message = "phone no already taken"
                status = "phone number exists"
                return Response({'status': status})
                # return Response(message, status=status.HTTP_400_BAD_REQUEST)
                # status = "phone number exists"
            else:

                cover_picture = "https://res.cloudinary.com/dtnbd0res/image/upload/v1684387924/cover_picture/bu9dardzvvzaywvphjs7.jpg"
                upload_result = cloudinary.uploader.upload(
                    cover_picture,
                    folder='cover_picture'
                )
                # print(upload_result, 'lllllllllllllll')
                cover_picture = upload_result['secure_url']

                profile_picture = "https://res.cloudinary.com/dtnbd0res/image/upload/v1684419108/profile_picture/sywfducryop3fhv0cxd8.png"
                upload_result = cloudinary.uploader.upload(
                    profile_picture,
                    folder='profile_picture'
                )
                print("success")
                user = User.objects.create(
                    fullname=data['fullname'],
                    email=data['email'],
                    phone_number=data['phone_number'],
                    gender=data['gender'],
                    password=make_password(data['password']),
                    profile_picture=profile_picture,
                    cover_picture=cover_picture
                )
            user.is_staff = True

            user.save()
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data)

        except Exception as e:
            print(e)
            message = {'detail': 'Some Problem occured'}
            status = "somthign went wrong"
            return Response({'status': status})


class Login(APIView):
    def post(self, request):
        try:
            email = request.data['email']
            password = str(request.data['password'])
            user = authenticate(email=email, password=password)
        except:
            return Response({'status': 'Please Provide details(email,password)'})

        user = User.objects.all()
        status = 'None'

        for i in user:
            if i.email == email:
                if check_password(password, i.password):
                    if i.is_blocked:
                        status = 'User is blocked'
                        break
                    payload = {
                        'email': email,
                        'password': password,
                        'fullname': i.fullname,
                        'id': i.id,

                    }
                    enpayload = base64.b64encode(json.dumps(
                        payload).encode('utf-8')).decode('utf-8')
                    jwt_token = jwt.encode(
                        {'payload': enpayload}, 'secret', algorithm='HS256')
                    response = Response({'status': 'Success', 'payload': enpayload,
                                        'fullname': i.fullname, 'jwt': jwt_token, 'role': 'user', 'id': i.id, 'profile_picture': i.profile_picture})
                    return response
                else:
                    status = 'Wrong Password'
                    break
            else:
                status = 'Email is not found'

        return Response({'status': status})


class OTPLogin(APIView):
    def post(self, request):

        try:
            phone_number = request.data['mobileNumber']
            if User.objects.filter(phone_number=phone_number).exists():
                # user = authenticate(email=email)
                user = User.objects.get(phone_number=phone_number)
                if user.is_blocked:
                    return Response({'status': 'User is blocked'})
                payload = {
                    'email': user.email,
                    'fullname': user.fullname,
                    'id': user.id
                }
                print('payload', payload)
                enpayload = base64.b64encode(json.dumps(
                    payload).encode('utf-8')).decode('utf-8')
                jwt_token = jwt.encode(
                    {'payload': enpayload}, 'secret', algorithm='HS256')
                response = Response({'status': 'Success', 'payload': enpayload, 'email': user.email,
                                    'fullname': user.fullname, 'jwt': jwt_token, 'role': 'user', 'id': user.id, 'profile_picture': user.profile_picture})

                return response
            else:
                return Response({'status': 'User not found'})
        except:
            print("erooro")
            return Response({'status': 'Error occurred'})


@api_view(['POST'])
def verifyToken(request):
    token = request.data.get('token')
    decoded = jwt.decode(token, 'secret', algorithms='HS256')
    # Decode  payload
    decoded_bytes = base64.b64decode(decoded['payload'])
    #  byte string to unicode string
    decoded_str = decoded_bytes.decode('utf-8')
    decoded1 = json.loads(decoded_str)  # Parse JSON string as dictionary
    user = User.objects.get(email=decoded1.get('email'))
    # print(user, 'kkkkkkkkkskdskkdssdfs')
    if user:
        return Response({'username': user.fullname, 'id': user.id})
    else:
        return Response({'status': 'Token InValid'})


class Logout(APIView):
    def get(self, request):
        response = Response({'status': 'success'})
        response.clear('jwt')
        return response


class googleLogin(APIView):
    def post(self, request):
        # data = request.data
        email = request.data['email']

        try:
            if User.objects.filter(email=email).exists():
                user = authenticate(email=email)
                user = User.objects.all()
                status = 'None'
                for i in user:
                    print(i, "entering gooogle signin forloop")
                    if i.email == email:
                        print("checking email in fi ")
                        if i.is_blocked:
                            status = 'User is blocked'
                            break
                        payload = {
                            'email': email,
                            'fullname': i.fullname,
                            'id': i.id
                        }
                        print('payload', payload)
                        enpayload = base64.b64encode(json.dumps(
                            payload).encode('utf-8')).decode('utf-8')
                        jwt_token = jwt.encode(
                            {'payload': enpayload}, 'secret', algorithm='HS256')
                        response = Response({'status': 'Success', 'payload': enpayload, 'email': email,
                                            'fullname': i.fullname, 'jwt': jwt_token, 'role': 'user', 'id': i.id, 'profile_picture': i.profile_picture})
                        return response
            else:
                data = request.data
                # print(data)
                fullname = data['fullname']
                # print(fullname)
                email = data['email']

                # print("google dtails fetched success")

                cover_picture = "https://res.cloudinary.com/dtnbd0res/image/upload/v1684387924/cover_picture/bu9dardzvvzaywvphjs7.jpg"
                upload_result = cloudinary.uploader.upload(
                    cover_picture,
                    folder='cover_picture'
                )
                # print(upload_result, 'lllllllllllllll')
                cover_picture = upload_result['secure_url']

                profile_picture = "https://res.cloudinary.com/dtnbd0res/image/upload/v1684419108/profile_picture/sywfducryop3fhv0cxd8.png"
                upload_result = cloudinary.uploader.upload(
                    profile_picture,
                    folder='profile_picture'
                )

                user = User.objects.create(
                    fullname=data['fullname'],
                    email=data['email'],
                    profile_picture=profile_picture,
                    cover_picture=cover_picture,
                    fromGoogle=True
                )
                user.is_staff = True
                user.save()
                # print("user created using google")
                serializer = UserSerializer(user, many=False)
                # response=Response(serializer.data)

                user = authenticate(email=email)
                user = User.objects.all()
                status = 'None'
                for i in user:
                    print(i, "entering gooogle signin forloop")
                    if i.email == email:
                        print("checking email in fi ")
                        if i.is_blocked:
                            status = 'User is blocked'
                            break

                        payload = {
                            'email': email,
                            'fullname': i.fullname,
                            'id': i.id
                        }
                        print('payload', payload)
                        enpayload = base64.b64encode(json.dumps(
                            payload).encode('utf-8')).decode('utf-8')
                        jwt_token = jwt.encode(
                            {'payload': enpayload}, 'secret', algorithm='HS256')
                        response = Response({'status': 'Success', 'payload': enpayload, 'fullname': i.fullname,
                                            'jwt': jwt_token, "email": email, 'role': 'user', 'id': i.id,'profile_picture': i.profile_picture})
                        return response

        except:
            print("erooro")


@api_view(['POST'])
def changeProfilePic(request, user_id):
    user_id = user_id
    user = User.objects.get(id=user_id)   # Assuming the user is authenticated
    profile_picture = request.FILES["profile_picture"]
    if profile_picture:
        upload_result = cloudinary.uploader.upload(
            profile_picture,
            folder='profile_picture'
        )
        # print(upload_result, 'lllllllllllllll')
        profile_picture_url = upload_result['secure_url']
        user.profile_picture = profile_picture_url
        user.save()
        return Response({"profile_picture_url": profile_picture_url})
    else:
        return Response({"message": "Unsuccessful"})


@api_view(['POST'])
def changeCover(request, user_id):
    user_id = user_id
    user = User.objects.get(id=user_id) 
    cover_picture = request.FILES["cover_picture"]
    if cover_picture:
        upload_result = cloudinary.uploader.upload(
            cover_picture,
            folder='cover_picture'
        )
        # print(upload_result, 'lllllllllllllll')
        cover_picture_url = upload_result['secure_url']
        user.cover_picture = cover_picture_url
        user.save()
        return Response({"cover_picture_url": cover_picture_url})
    else:
        return Response({"message": "Unsuccessful"})



@api_view(['POST'])
def updatePassword(request, user_id):
    user = User.objects.get(id=user_id)
    current_password = request.data.get("current_password")
    new_password = request.data.get("new_password")

    if user.fromGoogle:
        user.password = make_password(new_password)
        user.fromGoogle=False
        user.save()
        
        return Response({"status": "success"})

    elif not user.check_password(current_password):
        print("errororr")
        return Response({"status": "error"})

    # Update the user's password
    else:
        user.password = make_password(new_password)
        user.save()
        return Response({"status": "success"})


@api_view(['POST'])
def updateUserDetails(request,user_id):
    user = User.objects.get(id=user_id)
    fullname = request.data.get("fullname")
    email = request.data.get("email")
    phone_number = request.data.get("phone_number")
    gender = request.data.get("gender")

    user.update_details(fullname, email, phone_number, gender)

    return Response({"status": "success",'fullname':fullname,'email':email})


class UserProfileSearchView(APIView):
    def get(self, request):
        query = request.GET.get('query')
        print(query,'llllll')
        if query:
            # Perform search using the query
            results = User.objects.filter(
                Q(fullname__icontains=query) | Q(email__icontains=query)
            )
        else:
            # Return all user profiles if no query is provided
            # results = User.objects.all()
            return Response({'status':'no result'})

        serializer = UserSerializer(results, many=True)
        return Response(serializer.data)