
from django.conf import settings
from .models import Hall, Booking, Event, RejectedBooking
from rest_framework import status,serializers
from .serializers import HallSerializer, EventSerializer, BookingSerializer, RejectedBookingSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from user.permissions import IsAdminUser, IsFacultyUser, IsFacultyOrAdminUser
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage
from django.http import FileResponse,HttpResponse
import json
from django.db.models import Q,Min
from django.core.exceptions import ObjectDoesNotExist

class BookHallAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        # Deserialize incoming data
        event_serializer = EventSerializer(data=request.data, context={'request': request, 'view': self})
        event_serializer.is_valid(raise_exception=True)
        event = event_serializer.save()

        # Check if hall is available
        hall_id = int(request.data['bookedHall'])
        hall = Hall.objects.get(id=hall_id)
        overlapping_bookings = Booking.objects.filter(
            bookedHall=hall,
            eventDate=request.data['eventDate'],
            endTime__gt=request.data['startTime'],
            startTime__lt=request.data['endTime']
        )

        if overlapping_bookings.exists() and request.data.get('put_in_queue', False):
            # Add booking request to queue
            booking_data = {
                'bookedHall': hall.id,
                'startTime': request.data['startTime'],
                'endTime': request.data['endTime'],
                'eventDate': request.data['eventDate'],
                'booker': request.user.id,
                'event': event.id,
                'verified': False,
                'rejected': False
            }
            booking_serializer = RejectedBookingSerializer(data=booking_data)
            booking_serializer.is_valid(raise_exception=True)
            booking_serializer.save()
            return Response(booking_serializer.data, status=status.HTTP_201_CREATED)
        
        elif overlapping_bookings.exists():
            # Return error if hall is not available
            error_message = 'Hall is already booked for this time period.'
            raise serializers.ValidationError({'error': error_message})

        # Create new booking object
        booking_data = {
            'bookedHall': hall.id,
            'startTime': request.data['startTime'],
            'endTime': request.data['endTime'],
            'eventDate': request.data['eventDate'],
            'booker': request.user.id,
            'event': event.id,
            'verified': False,
            'rejected': False
        }
        booking_serializer = BookingSerializer(data=booking_data)
        booking_serializer.is_valid(raise_exception=True)
        booking_serializer.save()

        # Serialize the new booking and event objects and return response
        event_data = event_serializer.data
        booking_data = booking_serializer.data
        data = {
            'event': event_data,
            'booking': booking_data,
        }
        # Send email alert to faculty
        subject = 'Hall Booking Request'
        message = 'A new request has been made to book a hall.'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ['facultymember987@gmail.com']

        email = EmailMessage(
            subject=subject,
            body=message,
            from_email=email_from,
            to=recipient_list,
            reply_to=[email_from],
        )

        email.send(fail_silently=False)

        return Response(data, status=status.HTTP_201_CREATED)


    
    
class EventDetail(APIView):
    permission_classes = [IsAuthenticated]
    
    def get_object(self, pk):
        """
        Helper method to get the Event object for a given primary key.
        Raises a Http404 exception if the object doesn't exist.
        """
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk, format=None):
        """
        Retrieve a single Event object by its primary key.
        """
        event = self.get_object(pk)
        event.eventDate = str(event.eventDate) 
        event.startTime = str(event.startTime)
        event.endTime = str(event.endTime)
        
        # Get the file download URL
        file_url = event.EventDetailFile.url if event.EventDetailFile else None
        
        # Create a dictionary with the relevant details
        data = {
            'eventManager': event.eventManager,
            'eventName': event.eventName,
            'eventDate': event.eventDate,
            'startTime': event.startTime,
            'endTime': event.endTime,
            'bookedHall': event.bookedHall.id,
            'organizingClub': event.organizingClub,
            'EventDetailText': event.EventDetailText,
            'PhoneNumber': str(event.PhoneNumber),
            'email': event.email,
            'fileUrl': file_url
        }
        
        # Serialize the dictionary to JSON
        json_data = json.dumps(data)
        
        # Return the JSON response
        return HttpResponse(json_data, content_type='application/json')

    def put(self, request, pk, format=None):
        """
        Update an existing Event object by its primary key.
        """
        event = self.get_object(pk)
        serializer = EventSerializer(event, data=request.data, context={'request': request, 'view': self})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Update bookings associated with the event
        bookings = Booking.objects.filter(event=event)
        for booking in bookings:
            booking_serializer = BookingSerializer(booking, data=request.data, partial=True)
            booking_serializer.is_valid(raise_exception=True)
            booking_serializer.save()

        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        """
        Delete an existing Event object by its primary key.
        """
        event = self.get_object(pk)
        # Delete associated bookings first
        bookings = Booking.objects.filter(event=event)
        bookings.delete()
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class EventList(APIView):
    permission_classes = [IsAuthenticated]
    """
    View to list all events.
    """

    def get(self, request):
        """
        GET request handler for EventList view.
        """
        
        event = Event.objects.all()

        serializer = EventSerializer(event, many=True)
        return Response(serializer.data)




class HallList(APIView):
    """
    API view to get a list of all halls.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        """
        HTTP GET method to get a list of all halls.

        Args:
            request: HTTP request object containing request data.

        Returns:
            Response: HTTP response object containing response data.
        """
        halls = Hall.objects.all()
        serializer = HallSerializer(halls, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class HallDetail(APIView):
    """
    API view to get details of a particular hall.
    """
    permission_classes = [AllowAny]

    def get_object(self, pk):
        """
        Method to get the hall object with the given primary key.

        Args:
            pk: Primary key of the hall object to be fetched.

        Returns:
            Hall: Hall object with the given primary key, None if not found.
        """
        try:
            return Hall.objects.get(pk=pk)
        except Hall.DoesNotExist:
            return None

    def get(self, request, pk):
        """
        HTTP GET method to get details of a particular hall.

        Args:
            request: HTTP request object containing request data.
            pk: Primary key of the hall object to be fetched.

        Returns:
            Response: HTTP response object containing response data.
        """
        hall = self.get_object(pk)
        if hall is None:
            return Response({'message': 'Hall not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = HallSerializer(hall)
        return Response(serializer.data, status=status.HTTP_200_OK)


class HallCreate(APIView):
    permission_classes = [IsFacultyOrAdminUser]

    def post(self, request):
        """
        Creates a new Hall object with the given data.

        Parameters:
        - request: Django request object containing data to create a new Hall object

        Returns:
        - Response: Django response object containing the serialized Hall object
        """
        serializer = HallSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HallUpdate(APIView):
    permission_classes = [IsAdminUser]

    def put(self, request, pk):
        """
        Updates an existing Hall object with the given data.

        Parameters:
        - request: Django request object containing data to update the Hall object
        - pk: Primary key of the Hall object to update

        Returns:
        - Response: Django response object containing the serialized Hall object
        """
        hall = Hall.objects.filter(pk=pk).first()
        if hall is None:
            return Response({'message': 'Hall not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = HallSerializer(hall, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HallDelete(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, pk):
        """
        Deletes an existing Hall object.

        Parameters:
        - request: Django request object
        - pk: Primary key of the Hall object to delete

        Returns:
        - Response: Django response object
        """
        hall = Hall.objects.filter(pk=pk).first()
        if hall is None:
            return Response({'message': 'Hall not found'}, status=status.HTTP_404_NOT_FOUND)

        hall.delete()
        return Response({'message': 'Hall deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


class BookingList(APIView):
    permission_classes = [AllowAny]
    """
    View to list all bookings and create a new booking.
    """

    def get(self, request):
        """
        GET request handler for BookingList view.

        If user is staff, return all bookings.
        If user is non-staff, return only their own bookings.
        """
        # if request.user.is_staff:
        #     # For staff users, return all bookings
        #     bookings = Booking.objects.all()
        # else:
        #     # For non-staff users, return only their own bookings
        #     bookings = Booking.objects.filter(booker=request.user)
        
        bookings = Booking.objects.all()

        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        POST request handler for BookingList view.

        Create a new booking.
        """
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            # Set the booker to the current user
            serializer.validated_data['booker'] = request.user
            # Save the booking
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookingDetail(APIView):
    permission_classes=[IsAuthenticated]
    """
    View to retrieve, update or delete a booking instance.
    """

    def get_object(self, pk):
        """
        Helper method to get the booking instance with the given primary key.
        """
        return get_object_or_404(Booking, pk=pk)

    def get(self, request, pk):
        """
        GET request handler for BookingDetail view.

        Retrieve a booking instance.
        """
        booking = self.get_object(pk)
        serializer = BookingSerializer(booking)
        return Response(serializer.data)
    
    def put(self, request, pk):
        """
        PUT request handler for BookingDetail view.

        Update a booking instance.
        """
        booking = self.get_object(pk)
        serializer = BookingSerializer(booking, data=request.data)
        if serializer.is_valid():
            serializer.save()

            # Send email if verified
            if booking.verified:
                subject = 'Hall Booking Confirmation'
                message = f'Your booking for event {booking.event.eventName} has been confirmed.'
                from_email = settings.EMAIL_HOST_USER
                recipient_list = [booking.event.email]
                email = EmailMessage(
                    subject=subject,
                    body=message,
                    from_email=from_email,
                    to=recipient_list,
                    reply_to=[from_email],
                )
                email.send(fail_silently=False)

            # Send email if rejected
            if booking.rejected:
                subject = 'Hall Booking Rejection'
                message = f'Your booking for event {booking.event.eventName} has been rejected.'
                from_email = settings.EMAIL_HOST_USER
                recipient_list = [booking.event.email]
                email = EmailMessage(
                    subject=subject,
                    body=message,
                    from_email=from_email,
                    to=recipient_list,
                    reply_to=[from_email],
                )
                email.send(fail_silently=False)

            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        """
        DELETE request handler for BookingDetail view.

        Delete a booking instance.
        """
        try:
            booking = self.get_object(pk)
            event = booking.event
            start_time = booking.startTime
            end_time = booking.endTime
            event_date = booking.eventDate
            booking.delete()
            event.delete()
            
        except ObjectDoesNotExist:
            # Handle the case where no booking object with the specified pk exists
            return Response(
                {'error': 'Booking does not exist'},
                status.HTTP_404_NOT_FOUND
            )

        try:
            # Query the RejectedBooking table for the minimum ID where the eventDate and time interval match the deleted booking object
            rejected_booking = RejectedBooking.objects.filter(
                eventDate=event_date,
                startTime=start_time,
                endTime=end_time
            ).aggregate(Min('id'))

            if rejected_booking is not None:
                # Retrieve the data from the RejectedBooking object with the minimum ID
                rejected_booking_data = RejectedBooking.objects.get(id=rejected_booking['id__min'])

                # Create a new Booking object using the data retrieved from the RejectedBooking object
                new_booking = Booking.objects.create(
                    event=rejected_booking_data.event,
                    bookedHall=rejected_booking_data.bookedHall,
                    startTime=rejected_booking_data.startTime,
                    endTime=rejected_booking_data.endTime,
                    eventDate=rejected_booking_data.eventDate,
                    booker=rejected_booking_data.booker
                )

                # Serialize the new Booking object and return it as a response
                serializer = BookingSerializer(new_booking)
                
                subject = 'Your Booking is now in Pending'
                message = f'Your booking for event {rejected_booking_data.event.eventName} has been released from queue.'
                from_email = settings.EMAIL_HOST_USER
                recipient_list = [rejected_booking_data.event.email]
                email = EmailMessage(
                    subject=subject,
                    body=message,
                    from_email=from_email,
                    to=recipient_list,
                    reply_to=[from_email],
                )
                email.send(fail_silently=False)
                return Response(serializer.data)
            else:
                # Handle the case where no RejectedBooking object exists
                return Response(
                    {'error': 'No matching rejected booking exists'},
                    status.HTTP_400_BAD_REQUEST
                )
        except ObjectDoesNotExist:
            # Handle the case where retrieving the RejectedBooking object fails
            return Response(
                {'error': 'Failed to retrieve rejected booking'},
                status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        # Return an empty response if a new Booking object was not created
        return Response({})
