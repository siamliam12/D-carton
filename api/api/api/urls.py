
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from rest_framework_simplejwt import views as jwt_views
from authentication.views import MyTokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/',MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('api/token/refresh/',jwt_views.TokenRefreshView.as_view(),name='token_refresh'),
    path('api/auth/', include('authentication.urls')),
    path('api/products/', include('product.urls')),
] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
