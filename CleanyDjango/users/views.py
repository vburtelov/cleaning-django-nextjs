from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.status import HTTP_403_FORBIDDEN
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from users.models import CustomUser
from users.serializers import CustomUserSerializer, CustomUserCreateSerializer, CustomUserUpdateSerializer, \
    CustomUserUpdatePasswordSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get_serializer_class(self):
        serializer_class = self.serializer_class
        if self.request.method == 'POST':
            serializer_class = CustomUserCreateSerializer
        return serializer_class

    def perform_create(self, serializer):
        if 'password' in self.request.data:
            password = make_password(self.request.data['password'])
            serializer.save(password=password)
        else:
            serializer.save()

    def create(self, request, *args, **kwargs):
        send_mail(
            'Подтвердите ваш email',
            'Ссылка для подтверждения',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[request.data['email'], ],
            fail_silently=False,
        )
        return super().create(request, *args, **kwargs)


class CustomUserVerifyEmailView(APIView):
    def get(self, request, token, *args, **kwargs):
        try:
            user = CustomUser.objects.get(token=self.request.data['token'])
        except CustomUser.DoesNotExist:
            return Response({'error': 'Пользователь не найден'}, status=HTTP_403_FORBIDDEN)
        user.is_active = True
        user.save()
        return Response({'success': 'Пользователь активирован'})


class GetUserInformation(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request, *args, **kwargs):
        user = self.request.user
        if user.is_authenticated:
            serializer = CustomUserUpdateSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        return Response(status=HTTP_403_FORBIDDEN, data={"message": "Вы не авторизованы"})

    def get(self, request, *args, **kwargs):
        user = self.request.user
        if user.is_authenticated:
            serializer = CustomUserSerializer(user)
            return Response(serializer.data)
        return Response(status=HTTP_403_FORBIDDEN, data={"message": "Вы не авторизованы"})


class RestorePasswordWithEmail(APIView):

    def post(self, request, *args, **kwargs):
        try:
            user = CustomUser.objects.get(email=self.request.data['email'])
        except CustomUser.DoesNotExist:
            return Response({'error': 'Пользователь не найден'}, status=HTTP_403_FORBIDDEN)
        send_mail(
            'Восстановление пароля',
            'Ссылка для восстановления пароля',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email, ],
            fail_silently=False,
        )
        return Response({'success': 'Письмо отправлено'})


class ChangePassword(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request, *args, **kwargs):
        user = self.request.user
        old_password = request.data.get('old_password')
        if user.is_authenticated and user.check_password(old_password):
            serializer = CustomUserUpdatePasswordSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        else:
            return Response(status=HTTP_403_FORBIDDEN, data={"message": "Вы не авторизованы или неверный пароль"})
