from django.urls import path,include
from rest_framework import routers

from .views import(
    BookHallAPIView,
    HallViewSet,
    BookingViewSet,
)

router_halls = routers.DefaultRouter()
router_halls.register('halls_api', HallViewSet)

router_booking = routers.DefaultRouter()
router_booking.register('booking_api', BookingViewSet)

urlpatterns = [
     path('book_hall/',BookHallAPIView.as_view(),name='book_hall'),
     path('', include(router_halls.urls)),
     path('', include(router_booking.urls)),
]
