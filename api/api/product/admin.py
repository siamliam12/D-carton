from django.contrib import admin
from .models import Product,Category,Comment

class CommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'comment', 'product']
# Register your models here.
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Comment,CommentAdmin)