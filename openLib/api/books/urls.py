from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'', views.UserViewSet)

urlpatterns = [
    path("user/", include(router.urls), name="users"),
    path("user/login/", views.signin, name="login"),
    path("user/logout/<int:id>/", views.signout, name="logout"),
]
