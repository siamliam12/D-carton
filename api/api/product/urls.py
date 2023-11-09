from django.urls import path
from . import views

urlpatterns = [
    path("",views.AllProduct.as_view(),name="allRoutes"),
]