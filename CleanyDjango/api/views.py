from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Order, ExtraService, BasicService, Cleaner, TypeOfCleaning, Frequency, CleaningTime, \
    CleanerCalendar, DiscountCode
from api.serializers import OrderSerializer, OrderCreateSerializer, ExtraServiceSerializer, BasicServiceSerializer, \
    CleanerSerializer, TypeOfCleaningSerializer, FrequencySerializer, CleaningTimeSerializer, CleanerCalendarSerializer, \
    DiscountCodeSerializer


class CheckDiscountCodeAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = DiscountCode.objects.all()
    serializer_class = DiscountCodeSerializer
    http_method_names = ['get']

    def list(self, request, *args, **kwargs):
        discount_code = request.query_params.get('discount_code', None)
        if discount_code:
            queryset = self.get_queryset().filter(code=discount_code, is_active=True)
            serializer = self.get_serializer(queryset.first())
            if serializer.data['is_active']:
                return Response({
                    'id': serializer.data['id'],
                    'discount_code': serializer.data['code'],
                    'discount': serializer.data['discount'],
                    'is_active': serializer.data['is_active'],
                    'message': 'Код успешно активирован. Ваша скидка  {} рублей'.format(serializer.data['discount'])
                })
            else:
                return Response({"Промокод не активен"}, status=400)
        else:
            return Response({'Промокод не указан'}, status=400)


class CleanerCalendarViewSet(viewsets.ModelViewSet):
    queryset = CleanerCalendar.objects.all()
    serializer_class = CleanerCalendarSerializer
    http_method_names = ['get']


class CleaningTimeViewSet(viewsets.ModelViewSet):
    queryset = CleaningTime.objects.all()
    serializer_class = CleaningTimeSerializer
    http_method_names = ['get']


class FrequencyViewSet(viewsets.ModelViewSet):
    queryset = Frequency.objects.all()
    serializer_class = FrequencySerializer
    http_method_names = ['get']


class TypeOfCleaningViewSet(viewsets.ModelViewSet):
    queryset = TypeOfCleaning.objects.all()
    serializer_class = TypeOfCleaningSerializer
    http_method_names = ['get']


class CleanerViewSet(viewsets.ModelViewSet):
    queryset = Cleaner.objects.filter(is_active=True)
    serializer_class = CleanerSerializer
    http_method_names = ['get']


class ExtraServiceViewSet(viewsets.ModelViewSet):
    queryset = ExtraService.objects.all()
    serializer_class = ExtraServiceSerializer
    http_method_names = ['get']


class BasicServiceViewSet(viewsets.ModelViewSet):
    queryset = BasicService.objects.all()
    serializer_class = BasicServiceSerializer
    http_method_names = ['get']


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    http_method_names = ['get', 'post']

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Order.objects.filter(user=self.request.user)
        else:
            return Order.objects.none()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_serializer_class(self):
        serializer_class = self.serializer_class
        if self.request.method == 'POST':
            serializer_class = OrderCreateSerializer
        return serializer_class
