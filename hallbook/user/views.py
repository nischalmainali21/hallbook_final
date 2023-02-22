from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class Register(APIView):
    permission_classes = [AllowAny]
    # def get(self,request):
    #     return Response('working')
    def post(self,request):
        print(request.data)
        serializer = UserSerializer(data =request.data)
        if serializer.is_valid():
            user = serializer.save()
            data = {
                'message':'User registered successfully',
                'success':True,
                'id':user.id,
                'username':user.username
            }
            return Response(data,status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status = status.HTTP_400_BAD_REQUEST)

class OnlyAuthenticated(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        return Response('You are authenticated')

    


class Login(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        username = request.data.get('username')
        password = request.data.get('password')
        if username and password:
            user = User.objects.get(username = username, password = password)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                data= {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'message':'Login done successfully',
                    'success':True
                }
                return Response(data,status=status.HTTP_200_OK)
               
        else:
            data = {
                'message':'Username and/or password is empty',
                'success':False
            }
            return Response(data,status=status.HTTP_400_BAD_REQUEST) 
