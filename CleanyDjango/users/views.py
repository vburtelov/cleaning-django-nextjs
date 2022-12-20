from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_400_BAD_REQUEST, HTTP_200_OK
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from users.models import CustomUser
from users.serializers import CustomUserSerializer, CustomUserCreateSerializer, CustomUserUpdateSerializer, \
    CustomUserUpdatePasswordSerializer, LoginSerializer
from users.task import send_verification_email


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
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
            user = serializer.save(password=password)
            send_verification_email.delay(user_id=user.pk,
                                          confirmation_token=default_token_generator.make_token(user),
                                          receiver=self.request.data['email'],
                                          sender=settings.DEFAULT_FROM_EMAIL)
        else:
            serializer.save()

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class CustomUserVerifyEmailView(APIView):
    def get(self, request, *args, **kwargs):
        user_id = self.request.GET['user_id']
        confirmation_token = self.request.GET['confirmation_token']
        try:
            user = CustomUser.objects.get(pk=user_id)
        except(TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            return Response('Пользователь не найден', status=HTTP_400_BAD_REQUEST)
        if not default_token_generator.check_token(user, confirmation_token):
            return Response('Токен не валиден, Пожалуйста запросите новое пиьсмо с подтверждением',
                            status=HTTP_400_BAD_REQUEST)
        user.is_active = True
        user.save()
        return Response('Почта успешно подтверждена')


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
