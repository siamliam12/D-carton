from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Create your views here.
class AllProduct(APIView):
    def get(self,request):
        data = {
            'route':"http://localhost:8000/api/products",
            'name':"products",
        }
        return Response(data)