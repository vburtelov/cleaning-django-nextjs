from django.contrib.auth.hashers import make_password
from rest_framework import serializers, exceptions
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from users.models import CustomUser, CustomGroup


class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        authenticate_kwargs = {
            self.username_field: attrs[self.username_field],
            'password': attrs['password'],
        }
        try:
            authenticate_kwargs['request'] = self.context['request']
        except KeyError:
            pass
        try:
            user = CustomUser.objects.get(email=authenticate_kwargs['email'])
            if not user.check_password(authenticate_kwargs['password']):
                self.error_messages['no_active_account'] = 'Неверный пароль'
                raise exceptions.AuthenticationFailed(self.error_messages['no_active_account'], 'Неверный пароль')
            if not user.is_active:
                self.error_messages['no_active_account'] = 'Подтвердите почту'
                raise exceptions.AuthenticationFailed(self.error_messages['no_active_account'], 'Подтвердите почту')
        except CustomUser.DoesNotExist:
            self.error_messages['no_active_account'] = 'Пользователь не найден'
            raise exceptions.AuthenticationFailed(self.error_messages['no_active_account'], 'Пользователь не найден')
        return super().validate(attrs)


class CustomGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomGroup
        exclude = ('permissions',)


class CustomUserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class CustomUserSerializer(serializers.ModelSerializer):
    groups = CustomGroupSerializer(many=True)

    class Meta:
        model = CustomUser
        exclude = ('password',)


class CustomUserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ('password', 'groups')


class CustomUserUpdatePasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('password',)
        extra_kwargs = {'password': {'write_only': True}}

    def update(self, instance, validated_data):
        instance.password = make_password(validated_data['password'])
        instance.save()
        return instance
