from rest_framework import serializers
from .models import Comment,Category,Product

class CommentSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Comment
        fields = ['id','user','comment','product']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields =['id','fields']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=False,read_only=True)
    comments = CommentSerializer(many=True,read_only=True)
    class Meta:
        model = Product
        fields = ['id','name','price','details','rating','image','is_on_sale','category','comments']