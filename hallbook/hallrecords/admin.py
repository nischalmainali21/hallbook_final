from django.contrib import admin
from .models import Event,Hall,Booking,RejectedBooking

# Register your models here.
admin.site.register(Event)
admin.site.register(Hall)
admin.site.register(Booking)
admin.site.register(RejectedBooking)
