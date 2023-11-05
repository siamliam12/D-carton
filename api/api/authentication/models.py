from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

def upload_to(instance,filename):
    return 'images/{filename}'.format(filename=filename)

class CustomUser(AbstractUser):
    name = models.CharField(max_length=255)
    bio = models.CharField(max_length=255,blank=True)
    email = models.EmailField()
    number = models.CharField(max_length=16)
    profile_image_url = models.ImageField(upload_to=upload_to,blank=True,null=True)

    def __str__(self):
        return self.name