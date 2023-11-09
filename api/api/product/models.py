from django.db import models
from authentication.models import CustomUser

# Create your models here.
class Category(models.Model):
    fields = models.CharField(max_length=100)

    def __str__(self):
        return self.fields
    
class Comment(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    comment = models.TextField()


def upload_to(instance,filename):
    return 'images/{filename}'.format(filename=filename)

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    rating = models.FloatField()
    image = models.ImageField(upload_to=upload_to,blank=True,null=True)
    is_on_sale = models.BooleanField(default=False)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    details = models.TextField()
    comments = models.ForeignKey(Comment, on_delete=models.SET_NULL,blank=True,null=True)
    
    def __str__(self):
        return self.name