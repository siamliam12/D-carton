from django.urls import path
from . import views

urlpatterns = [
    path("",views.AllProduct.as_view(),name="allRoutes"),
    path("allproducts/",views.get_all_products,name="get_all_products"),
    path("comment/",views.create_comment,name="create_comment"),
    path("comment/<int:comment_id>",views.update_comment,name="update_comment"),
    path("comment/<int:comment_id>",views.delete_comment,name="delete_comment"),
]