from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import authentication_classes, permission_classes

from .models import CustomUser
from .models import Books


class UserSerializer(serializers.HyperlinkedModelSerializer):

    # TODO: create and update
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance

    class Meta:
        model = CustomUser
        extra_kwargs = {'password': {'write_only': True}}
        fields = ('first_name', 'last_name', 'email', 'phone',
                  'gender', 'is_active', 'is_staff', 'is_superuser', 'password')


class BooksUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Books
        fields = ('title', 'author', 'subject', 'description',
                  'uploaded_at', 'like', 'edition', 'uploaded_by',  'stream', 'file')


class BooksSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Books
        fields = ('id', 'title', 'author', 'subject', 'description',
                  'uploaded_at', 'like', 'edition', 'uploaded_by',  'stream', 'file')
