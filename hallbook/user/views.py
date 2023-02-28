from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer


class Register(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        """
        POST request to register a new user.

        Parameters:
        request (HttpRequest): The request object containing user data.

        Returns:
        Response: A JSON response with status code and message.

        """
        # Get user_type from request data
        user_type = request.data.get('user_type')
        # Check if user_type is valid
        if user_type not in ['student', 'faculty', 'admin']:
            return Response({'message': 'Invalid user type'}, status=status.HTTP_400_BAD_REQUEST)

        # Create user serializer
        serializer = UserSerializer(data=request.data)

        # Check if serializer is valid and save user
        if serializer.is_valid():
            user = serializer.save(user_type=user_type)
            data = {
                'message': 'User registered successfully',
                'success': True,
                'id': user.id,
                'email': user.email,
                'user_type': user_type,
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OnlyAuthenticated(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        GET request to check if user is authenticated.

        Parameters:
        request (HttpRequest): The request object.

        Returns:
        Response: A JSON response with status code and message.

        """
        return Response('You are authenticated')


class Login(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        """
        POST request to login a user.

        Parameters:
        request (HttpRequest): The request object containing user credentials.

        Returns:
        Response: A JSON response with status code and message.

        """
        # Get user credentials from request data
        email = request.data.get('email')
        password = request.data.get('password')
        user_type = request.data.get('user_type')

        # Check if all required credentials are present
        if email and password and user_type:
            user = None
            # Authenticate user based on user_type
            if user_type == 'student':
                user = authenticate(request=request, username=email, password=password, student__isnull=False)
            elif user_type == 'admin':
                user = authenticate(request=request, username=email, password=password, admin__isnull=False)
            elif user_type == 'faculty':
                user = authenticate(request=request, username=email, password=password, faculty__isnull=False)

            # Check if user is authenticated
            if user is not None:
                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                data = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'message': 'Login done successfully.',
                    'success': True
                }
                return Response(data, status=200)

        data = {
            'message': 'Invalid credentials.',
            'success': False
        }
        return Response(data, status=400)


class UserList(generics.ListAPIView):
    """
    API view to list all users.
    """
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
