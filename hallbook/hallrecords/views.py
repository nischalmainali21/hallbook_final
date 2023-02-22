from .models import Hall,Booking
from rest_framework import status
from .serializers import HallSerializer,EventSerializer,BookingSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated



class BookHallAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = {
                'message':'Event details entered successfully',
                'success':True,
            }
            return Response(data,status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status = status.HTTP_400_BAD_REQUEST)

class HallViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Hall.objects.all()
    serializer_class = HallSerializer
    


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

