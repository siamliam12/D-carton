from django.urls import path
from . import views

urlpatterns = [
    path("",views.AllRoutes,name="allRoutes"),
    path("register/",views.RegisterUser.as_view(),name="userRegister"),
    path("login/",views.LoginUser.as_view(),name="userLogin"),
]