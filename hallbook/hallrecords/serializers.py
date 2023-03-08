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
        fields = ['id','bookedHall','verified_by', 'verified','event','startTime','endTime','booker','eventDate','rejected']



class EventSerializer(serializers.ModelSerializer):
    """
    Serializer for the Event model.
    """
    bookedHall = serializers.PrimaryKeyRelatedField(queryset=Hall.objects.all())

    class Meta:
        model = Event
        fields = ('id', 'eventManager', 'eventName', 'eventDate', 'startTime', 'endTime', 'bookedHall', 'organizingClub', 'EventDetailFile', 'EventDetailText', 'PhoneNumber','email')
        
class EventSerializer(serializers.ModelSerializer):
    """
    Serializer for the Event model.
    """
    bookedHall = serializers.PrimaryKeyRelatedField(queryset=Hall.objects.all())

    class Meta:
        model = Event
        fields = ('id', 'eventManager', 'eventName', 'eventDate', 'startTime', 'endTime', 'bookedHall', 'organizingClub', 'EventDetailFile', 'EventDetailText', 'PhoneNumber','email')


    def validate(self, data):
        """
        Check that the start time and end time of the event do not clash with other events
        """
        # Get the event data from the request data
        event_id = self.context.get('view').kwargs.get('pk')
        event_start_time = data['startTime']
        event_end_time = data['endTime']
        event_date = data['eventDate']
        booked_hall = data['bookedHall']

        # If the request method is PUT, exclude the current event from the queryset
        events = Event.objects.all()

        if event_id:
            events = events.exclude(id=event_id)

        # Check if any other event is booked in the same hall for the given time and date
        conflicting_events = events.filter(
            bookedHall=booked_hall,
            eventDate=event_date,
            startTime__lt=event_end_time,
            endTime__gt=event_start_time
        )

        if conflicting_events.exists():
            if event_id:
                conflicting_events = conflicting_events.exclude(id=event_id)

            if conflicting_events.exists():
                raise serializers.ValidationError('This hall is not available for the given time period')

        return data
