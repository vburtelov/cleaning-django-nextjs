from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView, TokenBlacklistView, TokenVerifyView,
)

from users.views import CustomUserViewSet, GetUserInformation, ChangePassword

router = routers.DefaultRouter()
router.register('', CustomUserViewSet, 'CustomUser')

urlpatterns = [
    path('me/', GetUserInformation.as_view(), name='me'),
    path('me/changepass/', ChangePassword.as_view(), name='change_password'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('', include(router.urls)),
]
