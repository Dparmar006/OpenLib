from django.contrib import admin
from .models import CustomUser, Books
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Books)
