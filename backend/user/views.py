from django.shortcuts import render

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

# class SignUp(APIView):
#     def post(self,request):
#         serializer=UserSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)

class SignUp(APIView):
    def post(self, request):
        try:

            data = request.data
            print(data)
            fullname = data['fullname']
            print(fullname)
            email = data['email']
            phone_number = data['phone_number']
            gender=data['gender']
            

            if User.objects.filter(email=email).exists():
                print('email exists')
                message = "email already exists"
                status = "email exists"
                return Response({'status': status})
                # return Response(message, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(phone_number=phone_number).exists():
                print("phoneno exists")
                message="phone no already taken"
                status = "phone number exists"
                return Response({'status': status})
                # return Response(message, status=status.HTTP_400_BAD_REQUEST)
                # status = "phone number exists"
            else:
                print("success")
                user = User.objects.create(
                fullname = data['fullname'],
                email = data['email'],
                phone_number=data['phone_number'],
                gender=data['gender'],
                password = make_password(data['password'])
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
        
    

# class Login(APIView):

#     def post(self, request):

#         try:
#             email = request.data['email']
#             password = str(request.data['password'])
#         except:
#             return Response({'status': 'Please Provide details(email,password)'})

#         user = User.objects.all()
#         # for users in user:
#         #     print(users.fullname)

#         status = 'None'

#         for i in user:
#             if i.email == email:
#                 if check_password(password, i.password):
#                     payload = {
#                         'email': email,
#                         'password': password,
#                         'fullname':i.fullname,
#                     }
#                     enpayload = base64.b64encode(json.dumps(
#                         payload).encode('utf-8')).decode('utf-8')
#                     jwt_token = jwt.encode(
#                         {'payload': enpayload}, 'secret', algorithm='HS256')
#                     response = Response(
#                         {'status': 'Success','payload': enpayload,'fullname':i.fullname, 'jwt': jwt_token, 'role': 'user', 'id': i.id})
#                     return response
#                 else:
#                     status = 'Wrong Password'
#                     break
#             else:
#                 status = 'Email is not found'

#         return Response({'status': status})

class Login(APIView):
    def post(self, request):
        try:
            email = request.data['email']
            password = str(request.data['password'])
            user = authenticate(email=email,password=password)
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
                        'id':i.id
                    }
                    enpayload = base64.b64encode(json.dumps(payload).encode('utf-8')).decode('utf-8')
                    jwt_token = jwt.encode({'payload': enpayload}, 'secret', algorithm='HS256')
                    response = Response({'status': 'Success', 'payload': enpayload, 'fullname': i.fullname, 'jwt': jwt_token, 'role': 'user', 'id': i.id})
                    return response
                else:
                    status = 'Wrong Password'
                    break
            else:
                status = 'Email is not found'

        return Response({'status': status})





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
    print(user,'kkkkkkkkkskdskkdssdfs')
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
            data = request.data
            email = request.data['email']

            try:
                if User.objects.filter(email=email).exists():
                    user = authenticate(email=email)
                    user = User.objects.all()
                    status = 'None'
                    for i in user:
                        print(i,"entering gooogle signin forloop")
                        if i.email == email:
                                print("checking email in fi ")
                                if i.is_blocked:
                                    status = 'User is blocked'
                                    break
                                payload = {
                                    'email': email,
                                    'fullname': i.fullname,
                                    'id':i.id
                                }
                                print('payload',payload)
                                enpayload = base64.b64encode(json.dumps(payload).encode('utf-8')).decode('utf-8')
                                jwt_token = jwt.encode({'payload': enpayload}, 'secret', algorithm='HS256')
                                response = Response({'status': 'Success', 'payload': enpayload, 'fullname': i.fullname, 'jwt': jwt_token, 'role': 'user', 'id': i.id})
                                return response
                else:
                    data = request.data
                    # print(data)
                    fullname = data['fullname']
                    # print(fullname)
                    email = data['email']

                    # print("google dtails fetched success")
                    user = User.objects.create(
                    fullname = data['fullname'],
                    email = data['email'],
                    fromGoogle=True
                    )
                    user.is_staff = True  
                    user.save()   
                    # print("user created using google")       
                    serializer = UserSerializer(user, many=False)
                    # response=Response(serializer.data)
                    payload = {
                        'email': email,
                        'fullname': i.fullname,
                        'id':i.id
                    }
                    print('payload',payload)
                    enpayload = base64.b64encode(json.dumps(payload).encode('utf-8')).decode('utf-8')
                    jwt_token = jwt.encode({'payload': enpayload}, 'secret', algorithm='HS256')
                    response = Response({'status': 'Success', 'payload': enpayload, 'fullname': i.fullname, 'jwt': jwt_token, 'role': 'user', 'id': i.id})
                    
                    return response

            except:
                print("erooro")





        # try:
        #     data = request.data
        #     email = request.data['email']
        #     print(email,"for authentication")
        #     user = authenticate(email=email)
            
        
        # except:
        #     print("enter exception if login credential failed")
        #     return Response({'status': 'Please Provide details(email)'})
        # user = User.objects.all()
        # # print(user,"llllllllllll")
        # status = 'None'

        # for i in user:
        #     print(i,"entering gooogle signin forloop")
        #     if i.email == email:
        #             print("checking email in fi ")
        #             if i.is_blocked:
        #                 status = 'User is blocked'
        #                 break
        #             payload = {
        #                 'email': email,
        #                 'fullname': i.fullname,
        #                 'id':i.id
        #             }
        #             print('payload',payload)
        #             enpayload = base64.b64encode(json.dumps(payload).encode('utf-8')).decode('utf-8')
        #             jwt_token = jwt.encode({'payload': enpayload}, 'secret', algorithm='HS256')
        #             response = Response({'status': 'Success', 'payload': enpayload, 'fullname': i.fullname, 'jwt': jwt_token, 'role': 'user', 'id': i.id})
        #             return response
        #     else:
        #         try:

        #             data = request.data
        #             # print(data)
        #             fullname = data['fullname']
        #             # print(fullname)
        #             email = data['email']

        #             # print("google dtails fetched success")
        #             user = User.objects.create(
        #             fullname = data['fullname'],
        #             email = data['email'],
        #             fromGoogle=True
        #             )
        #             user.is_staff = True  
        #             user.save()   
        #             # print("user created using google")       
        #             serializer = UserSerializer(user, many=False)

                    





        #             # response=Response(serializer.data)
        #             payload = {
        #                 'email': email,
        #                 'fullname': i.fullname,
        #                 'id':i.id
        #             }
        #             print('payload',payload)
        #             enpayload = base64.b64encode(json.dumps(payload).encode('utf-8')).decode('utf-8')
        #             jwt_token = jwt.encode({'payload': enpayload}, 'secret', algorithm='HS256')
        #             response = Response({'status': 'Success', 'payload': enpayload, 'fullname': i.fullname, 'jwt': jwt_token, 'role': 'user', 'id': i.id})
                    
        #             return response
                
        #         except:
        #             user = User.objects.all()
        #             # print(user,"llllllllllll")
        #             status = 'None'

        #             for i in user:
        #                 print(i,"entering gooogle signin forloop")
        #                 if i.email == email:
        #                         print("checking email in fi ")
        #                         if i.is_blocked:
        #                             status = 'User is blocked'
        #                             break
        #                         payload = {
        #                             'email': email,
        #                             'fullname': i.fullname,
        #                             'id':i.id
        #                         }
        #                         print('payload',payload)
        #                         enpayload = base64.b64encode(json.dumps(payload).encode('utf-8')).decode('utf-8')
        #                         jwt_token = jwt.encode({'payload': enpayload}, 'secret', algorithm='HS256')
        #                         response = Response({'status': 'Success', 'payload': enpayload, 'fullname': i.fullname, 'jwt': jwt_token, 'role': 'user', 'id': i.id})
        #                         return response

        
        # return Response({'status': status})
