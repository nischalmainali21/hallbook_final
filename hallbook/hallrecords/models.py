from django.contrib.auth import get_user_model
from django.db import models
from .customFields import NPPhoneNumberField


User = get_user_model()

class Hall(models.Model):
    """
    This model represents the Hall entity with its attributes.
    """
    hallName = models.CharField(max_length=50)
    capacity = models.IntegerField()
    location = models.CharField(max_length=255)

    def is_available(self, event_start_time, event_end_time, event_date):
        """
        Check if the hall is available for the given event time period and date.
        """
        conflicting_events = self.event_set.filter(
            models.Q(eventDate=event_date) & models.Q(startTime__lt=event_end_time) & models.Q(endTime__gt=event_start_time)
        )
        return not conflicting_events.exists()



class Event(models.Model):
    """
    This model represents the Event entity with its attributes.
    """
    eventManager = models.CharField(max_length=100)
    eventName = models.CharField(max_length=255)
    eventDate = models.DateField()
    startTime = models.TimeField()
    endTime = models.TimeField()
    bookedHall = models.ForeignKey('Hall', on_delete=models.CASCADE)
    organizingClub = models.CharField(max_length=255,blank=True)
    EventDetailFile = models.FileField(upload_to="eventFile/",max_length=250,null=True)
    EventDetailText = models.CharField(max_length=5000,default="Details")
    PhoneNumber = NPPhoneNumberField()

    

class Booking(models.Model):
    """
    Model for a booking made by a user for a particular event in a hall.
    """
    event = models.ForeignKey('Event', on_delete=models.CASCADE)
    bookedHall = models.ForeignKey('Hall', on_delete=models.CASCADE)
    startTime = models.TimeField()
    endTime = models.TimeField()
    verified = models.BooleanField(default=False)
    booker = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings', default=1)

    # A booking can be verified by either the admin or the faculty member who created the event
    verified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='verified_bookings')


   


