from django.urls import path, include
from rest_framework import routers


from . import views

router = routers.DefaultRouter()
router.register('user', views.UserViewSet)
router.register(r'', views.BooksViewSet)

urlpatterns = [
    # path("user/", include(router.urls), name="users"),
    path("login/", views.signin, name="login"),
    path("logout/<int:id>/", views.signout, name="logout"),

    path("", include(router.urls), name=""),
    path("addBook/<str:id>/<str:token>/",
         views.addBooks, name="add a new book"),

    # pdf

]
