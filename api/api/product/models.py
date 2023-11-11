from django.db import models
from django.conf import settings
from authentication.models import CustomUser

# Create your models here.
class Category(models.Model):
    fields = models.CharField(max_length=100)

    def __str__(self):
        return self.fields

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
    # comments = models.ForeignKey(Comment, on_delete=models.SET_NULL,blank=True,null=True)
    
    def __str__(self):
        return self.name
    
class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null=True,default=None)
    comment = models.TextField()
    product = models.ForeignKey(Product,related_name='comments',on_delete=models.CASCADE)
    
    def __str__(self):
        return self.comment