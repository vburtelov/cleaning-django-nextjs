from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from users.models import CustomUser, CustomGroup
from django.contrib.auth.models import Group


admin.site.unregister(Group)


@admin.register(CustomGroup)
class GroupAdmin(ImportExportModelAdmin):
    list_display = ('id', 'name')


@admin.register(CustomUser)
class CustomUserAdmin(ImportExportModelAdmin):
    list_display = ('id', 'name', 'surname', 'email', 'is_superuser',)
    list_filter = ('is_superuser', 'is_staff', )
    search_fields = ('name', 'surname', 'email',)
    ordering = ('email',)
