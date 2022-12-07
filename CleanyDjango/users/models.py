from django.db import models
from django.contrib.auth.models import AbstractUser

from .managers import CustomUserManager

from django.contrib.auth.models import Group


class CustomGroup(Group):
    pass

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = "Группа"
        verbose_name_plural = "Группы"


class CustomUser(AbstractUser):
    name = models.CharField(max_length=45, verbose_name="Имя")
    surname = models.CharField(max_length=45, verbose_name="Фамилия")
    middle_name = models.CharField(max_length=45, verbose_name="Отчество", blank=True, null=True)
    phone_number = models.CharField(max_length=45, verbose_name="Номер телефона")
    created_time = models.DateTimeField(auto_now_add=True, verbose_name="Дата регистрации")
    updated_time = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")

    groups = models.ManyToManyField(CustomGroup, blank=True)

    username = None
    first_name = None
    last_name = None
    email = models.EmailField("Электронная почта", unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'surname', 'phone_number']

    objects = CustomUserManager()

    def __str__(self):
        return f'{self.surname} {self.name}'

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"
