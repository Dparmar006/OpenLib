from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import authentication_classes

from .models import CustomUser


class UserSerializer(serializers.HyperlinkedModelSerializer):

    #TODO: create and update

    class Meta:
        model = CustomUser
        extra_kwargs = {'password': {'write_only': True}}
        fields = ('first_name', 'last_name', 'email', 'phone',
                  'gender', 'is_active', 'is_staff', 'is_superuser')
