from rest_framework import serializers
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for CustomUser model.
    """
    password = serializers.CharField(write_only=True, required=True)
    user_type = serializers.ChoiceField(choices=['student', 'faculty', 'admin'])

    def create(self, validated_data):
        """
        Create a new user.

        Args:
            validated_data (dict): Validated user data.

        Returns:
            CustomUser: Newly created user.
        """
        # Pop user_type field from validated data
        ValidUser_type = validated_data.pop('user_type')

        # Create a new user object
        user = CustomUser.objects.create_user(**validated_data)

        # Assign user_type to the user object
        user.user_type = ValidUser_type
        user.save()

        return user

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'user_type', 'password', 'first_name', 'last_name']
        extra_kwargs = {
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'user_type': {'required': True}
        }
