from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


# class Books(models.Model):
#     title = models.CharField(max_length=50)
#     author = models.CharField(max_length=50)
#     subject = models.CharField(max_length=50)
#     description = models.TextField(max_length=500)
#     uploaded_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     rating = models.IntegerField(max_length=1)
#     edition = models.IntegerField(max_length=2)
#     user = models.ForeignKey(AbstractUser, on_delete=models.CASCADE)


class CustomUser(AbstractUser):
    name = models.CharField(max_length=50, default='Anonymous')
    email = models.EmailField(max_length=256, unique=True)

    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    phone = models.CharField(max_length=12, null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    session_token = models.CharField(max_length=10, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
