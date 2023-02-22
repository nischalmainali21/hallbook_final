from django.db import models

# Create your models here.

from django.db import models

class Hall(models.Model):
    hallName = models.CharField(max_length=255)
    capacity = models.IntegerField()
    location = models.CharField(max_length=255)
    
    @property
    def hall_Name(self):
        return self.hallName
    
    @property
    def hall_capacity(self):
        return self.capacity
    @property
    def hall_location(self):
        return self.location

class Event(models.Model):
    
    eventManager = models.CharField(max_length=255)
    eventName = models.CharField(max_length=255)
    eventDate = models.DateField()
    startTime = models.TimeField()
    endTime = models.TimeField()
    

class Booking(models.Model):
    bookedHall = models.CharField(max_length=50)
    eventName = models.CharField(max_length=255)
    hallBooker = models.CharField(max_length=255)

    
    
    
        

    

