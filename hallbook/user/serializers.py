from django.contrib.auth.models import User
from rest_framework import serializers



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,required=True)
    
    def create(self,validated_data):
        user = User.objects.create(**validated_data)
        return user
    
    class Meta:
        model = User
        fields = ['id','username','email','password']
        
        extra_kwargs = {
            'email': {'required': True},
            'username':{'required':True}
        }


