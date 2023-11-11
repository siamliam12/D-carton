from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.authentication import SessionAuthentication,BaseAuthentication
from authentication.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Product,Comment
from .serializers import ProductSerializer,CommentSerializer

# Create your views here.
class AllProduct(APIView):
    def get(self,request):
        data = {
            'route':"http://localhost:8000/api/products",
            'name':"products",
        }
        return Response(data)
    
@api_view(['GET'])
def get_all_products(request):
    if request.method == 'GET':
        products = Product.objects.prefetch_related('comments').all()
        serializer = ProductSerializer(products,many=True)
        return Response(serializer.data)
    
#create comment 
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_comment(request):
    if request.method == 'POST':
        product_id = request.data.get('product')
        if not product_id:
            return Response({'error':'Product Id is required'},status=400)
        comment_data = {'comment':request.data.get('comment'),'product':product_id}
        # comment_data['user'] = request.user.id
        serializer = CommentSerializer(data=comment_data)

        if serializer.is_valid():
            print(serializer.validated_data)
            serializer.validated_data['user'] = request.user
            serializer.save()
            return Response(serializer.data,status=201)
        return Response(serializer.errors,status=400)
    
#update comment 
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_comment(request,comment_id):
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response({'error':'comment does not exist'},status=404)
    if request.user == comment.user:
        serializer = CommentSerializer(comment,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    else:
        return Response({'error':'You do not have the permission to edit the comment'},status=400)
    
#delete comment 
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_comment(request,comment_id):
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response({'error':'comment does not exist'},status=404)
    if request.user == comment.user:
        comment.delete()
        return Response({'message':"The comment deleted successfully!"},status=204)
    else:
        return Response({'error':'You do not have the permission to edit the comment'},status=400)