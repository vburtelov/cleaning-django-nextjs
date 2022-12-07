from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from users.models import CustomUser, CustomGroup


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
