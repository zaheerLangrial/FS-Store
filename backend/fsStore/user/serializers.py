from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'age',
            'profile_picture',
            'address',
            'mobile_number',
            'role',  # Ensure role is included here
            'password',
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'role': {'required': False}  # Make role optional if you don't want it required
        }

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            age=validated_data.get('age'),
            profile_picture=validated_data.get('profile_picture'),
            address=validated_data.get('address'),
            mobile_number=validated_data.get('mobile_number'),
            role=validated_data.get('role', 'user'),  # Default to 'user' if not provided
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
