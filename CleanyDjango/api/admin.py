from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin
from api.models import Order, Cleaner, ExtraService, DiscountCode, TypeOfCleaning, Frequency, BasicService, \
    CleanerCalendar, CleaningTime


@admin.register(Cleaner)
class CleanerAdmin(SimpleHistoryAdmin, ImportExportModelAdmin):
    list_display = ('id', 'name', 'number_of_sweeps', 'rating', 'is_active',)
    list_filter = ('rating', 'is_active',)
    search_fields = ('name', 'rating',)
    actions = ['make_not_active', 'make_active']

    @admin.action(description='Mark selected cleaners as not active')
    def make_not_active(self, request, queryset):
        queryset.update(is_active=False)

    @admin.action(description='Mark selected cleaners as active')
    def make_active(self, request, queryset):
        queryset.update(is_active=True)


@admin.register(Order)
class OrderAdmin(SimpleHistoryAdmin, ImportExportModelAdmin):
    list_display = ('id', 'date', 'city', 'street', 'type', 'square', 'cleaner', 'status',)
    list_filter = ('date', 'type', 'square', 'cleaner', 'status',)

    actions = ['make_not_active', 'make_active']

    @admin.action(description='Mark selected order as not active')
    def make_not_active(self, request, queryset):
        queryset.update(is_active=False)

    @admin.action(description='Mark selected order as active')
    def make_active(self, request, queryset):
        queryset.update(is_active=True)


@admin.register(CleaningTime)
class OrderAdmin(SimpleHistoryAdmin, ImportExportModelAdmin):
    list_display = ('id', 'time',)


@admin.register(CleanerCalendar)
class CleanerCalendarAdmin(SimpleHistoryAdmin, ImportExportModelAdmin):
    list_display = ('id', 'cleaner', 'date', 'time', 'order',)
    list_filter = ('cleaner', 'date', 'time', 'order',)


@admin.register(BasicService)
class ExtraServiceAdmin(SimpleHistoryAdmin, ImportExportModelAdmin):
    list_display = ('id', 'name',)
    search_fields = ('name',)


@admin.register(ExtraService)
class ExtraServiceAdmin(SimpleHistoryAdmin, ImportExportModelAdmin):
    list_display = ('id', 'name', 'price',)
    search_fields = ('name',)
    list_filter = ('price',)


@admin.register(TypeOfCleaning)
class TypeOfCleaningAdmin(SimpleHistoryAdmin, ImportExportModelAdmin):
    list_display = ('id', 'name', 'price_per_meter',)
    search_fields = ('name',)
    list_filter = ('price_per_meter',)


@admin.register(Frequency)
class FrequencyAdmin(SimpleHistoryAdmin, ImportExportModelAdmin):
    list_display = ('id', 'name',)
    search_fields = ('name',)


@admin.register(DiscountCode)
class DiscountCodeAdmin(SimpleHistoryAdmin, ImportExportModelAdmin):
    list_display = ('id', 'name', 'code', 'is_active',)
    search_fields = ('name', 'code')
    list_filter = ('number_of_uses', 'is_active')
    actions = ['make_not_active', 'make_active']

    @admin.action(description='Mark selected discount codes as not active')
    def make_not_active(self, request, queryset):
        queryset.update(is_active=False)

    @admin.action(description='Mark selected discount codes as active')
    def make_active(self, request, queryset):
        queryset.update(is_active=True)
