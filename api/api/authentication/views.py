from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializers import UserSerializer,UserRegistrationSerializer,UserLoginSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Create your views here.
@api_view(["GET"])
def AllRoutes(request):
    data = {
        "routes": [
            {
                "name": "Login",
                "url": "http://localhost:8000/api/auth/login",
            },
            {
                "name": "register",
                "url": "http://localhost:8000/api/auth/register"
            }
        ]
    }
    return Response(data)

class RegisterUser(APIView):
    def post(self,request,format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)
            token_serializer = TokenObtainPairSerializer(data={"email":user.email,"password":request.data["password"]})
            token_serializer.is_valid(raise_exception=True)
            access_token = token_serializer.validated_data["access"]

            return Response(
                {"user_id":user.id,"access_token":str(access_token),"refresh_token":str(refresh)},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class LoginUser(APIView):
    def post(self,request,format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.user
            refresh = RefreshToken.for_user(user)

            return Response({
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh),
                    'user_id': user.id,
                    'email': user.email,
            },
            status=status.HTTP_200_OK,
            )
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)