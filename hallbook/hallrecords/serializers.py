from rest_framework import serializers
from .models import Hall,Event,Booking

class HallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hall
        fields = ('id', 'hallName', 'capacity', 'location')

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id','eventManager','eventName','eventDate','startTime','endTime')
        
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('id','bookedHall','eventName','hallBooker')
        


