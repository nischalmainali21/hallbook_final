from rest_framework import serializers
from .models import Hall, Event, Booking
from django.shortcuts import get_object_or_404


class HallSerializer(serializers.ModelSerializer):
    """
    Serializer for the Hall model.
    """
    class Meta:
        model = Hall
        fields = ('id', 'hallName', 'capacity', 'location')



class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id','bookedHall','verified_by', 'verified','event','startTime','endTime','booker']



class EventSerializer(serializers.ModelSerializer):
    """
    Serializer for the Event model.
    """
    bookedHall = serializers.PrimaryKeyRelatedField(queryset=Hall.objects.all())

    class Meta:
        model = Event
        fields = ('id', 'eventManager', 'eventName', 'eventDate', 'startTime', 'endTime', 'bookedHall', 'organizingClub', 'EventDetailFile', 'EventDetailText', 'PhoneNumber')
        

    def validate(self, data):
        """
        Check if the selected hall is available for the requested time period.
        """
        bookedHall = data['bookedHall']
        if not bookedHall.is_available(data['startTime'], data['endTime'],data['eventDate']):
            raise serializers.ValidationError('Hall is already booked for this time period.')
        return data
