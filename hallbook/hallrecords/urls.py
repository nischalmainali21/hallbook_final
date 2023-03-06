from django.urls import path,include

from .views import(
    BookHallAPIView,
    HallCreate,
    HallDelete,
    HallDetail,
    HallList,
    HallUpdate,
    BookingList,
    BookingDetail,
    EventDetail,
    EventList
)




urlpatterns = [
    path('book_hall/',BookHallAPIView.as_view(),name='book_hall'),
    path('halls/', HallList.as_view(), name='hall-list'),
    path('halls/<int:pk>/', HallDetail.as_view(), name='hall-detail'),
    path('halls/create/', HallCreate.as_view(), name='hall-create'),
    path('halls/<int:pk>/update/', HallUpdate.as_view(), name='hall-update'),
    path('halls/<int:pk>/delete/', HallDelete.as_view(), name='hall-delete'),
    path('bookings/', BookingList.as_view(), name='booking-list'),
    path('bookings/<int:pk>/', BookingDetail.as_view(), name='booking-detail'),
    path('events/<int:pk>/',EventDetail.as_view(),name='event-detail'),
    path('events/', EventList.as_view(), name='event-list'),
]

