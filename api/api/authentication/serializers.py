from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'bio', 'email', 'number', 'profile_image_url')

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'bio', 'email', 'number', 'profile_image_url', 'password','confirm_password')
    def validate(self,data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        if password != confirm_password:
            raise serializers.ValidationError('Passwords do not match')
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password',None)
        user = CustomUser.objects.create_user(
            name=validated_data['name'],
            bio=validated_data['bio'],
            email=validated_data['email'],
            number=validated_data['number'],
            password=validated_data['password']
        )
        return user

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self,data):
        email = data.get('email')
        password = data.get('password')
        if email and password:
            user = authenticate(email=email, password=password)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError('User is not active')
                return {
                    'access':str(refresh.access_token),
                    'refresh':str(refresh),
                }
            else:
                raise serializers.ValidationError('Invalid credentials')
        else:
            raise serializers.ValidationError('Email and password are required')