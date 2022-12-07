from rest_framework import routers

from api.views import OrderViewSet, ExtraServiceViewSet, BasicServiceViewSet, CleanerViewSet, TypeOfCleaningViewSet, \
    FrequencyViewSet, CleaningTimeViewSet, CleanerCalendarViewSet, CheckDiscountCodeAPIView

router = routers.DefaultRouter()
router.register('cleaning-calendar', CleanerCalendarViewSet, 'CleanerCalendar')
router.register('cleaning-time', CleaningTimeViewSet, 'CleaningTime')
router.register('frequency', FrequencyViewSet, 'Frequency')
router.register('type-of-cleaning', TypeOfCleaningViewSet, 'TypeOfCleaning')
router.register('cleaner', CleanerViewSet, 'Cleaner')
router.register('basic-service', BasicServiceViewSet, 'BasicService')
router.register('extra-service', ExtraServiceViewSet, 'ExtraService')
router.register('order', OrderViewSet, 'Order')
router.register('check-discount-code', CheckDiscountCodeAPIView, 'CheckDiscountCode')

urlpatterns = router.urls
