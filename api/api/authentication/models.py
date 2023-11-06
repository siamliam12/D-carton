from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager
# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self,username,email,password=None,**extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(username=username,email=email,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self,username,email,password=None,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        return self.create_user(username,email,password,**extra_fields)
    
def upload_to(instance,filename):
    return 'images/{filename}'.format(filename=filename)

class CustomUser(AbstractUser):
    username = models.CharField(max_length=255,unique=True)
    name = models.CharField(max_length=255)
    bio = models.CharField(max_length=255,blank=True)
    email = models.EmailField(unique=True)
    number = models.IntegerField()
    profile_image_url = models.ImageField(upload_to=upload_to,blank=True,null=True)
    objects = CustomUserManager()
    def __str__(self):
        return self.name