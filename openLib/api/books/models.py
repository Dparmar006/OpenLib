from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class CustomUser(AbstractUser):
    # name = models.CharField(max_length=50, default='Anonymous')
    email = models.EmailField(max_length=256, unique=True)

    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    phone = models.CharField(max_length=12, null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    session_token = models.CharField(max_length=10, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


def saveBookToDB(self, instance, filename):
    return '/'.join(['bookFiles', str(instance.title)])


class Books(models.Model):

    title = models.CharField(max_length=50, unique=True)
    author = models.CharField(max_length=50)
    subject = models.CharField(max_length=50)
    description = models.TextField(max_length=500)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    stream = models.CharField(max_length=50)
    like = models.ManyToManyField(
        CustomUser, related_name='rating_book', blank=True)
    edition = models.IntegerField(null=True, blank=True, default=1)
    uploaded_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                                    related_name='referencing_owner_of_the_book')
    file = models.FileField(upload_to="bookFiles/", max_length=100)

    def __str__(self):
        return self.title
