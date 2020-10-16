from django.http import JsonResponse, HttpResponse
from django.contrib.auth import get_user_model
from django.contrib.auth import login, logout
import random
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import CustomUser, Books
from .serializers import UserSerializer, BooksSerializer

import re
# Create your views here.

# NOTE: Utilites


def validateUserSession(id, token):
    userModel = get_user_model()
    try:
        user = userModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        else:
            return False
    except userModel.DoesNotExist:
        return False


def generate_session_token(length=10):
    return "".join(random.SystemRandom().choice([chr(i) for i in range(97, 123)] + [str(i) for i in range(10)]) for _ in range(length))


def test(request):
    return JsonResponse({'success': 'yaay'})


@csrf_exempt
def signin(request, *args, **kwargs):
    if not request.method == 'POST':
        return JsonResponse({'error': 'Please pass a POST request'})

    username = request.POST.get('email')
    print(username)
    password = request.POST['password']

    regex = '[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'

    if(re.match(regex, str(username))):
        print("valid Email")
    else:
        return JsonResponse({'error': 'custom check : Invalid email'})

    if len(password) < 4:
        return JsonResponse({'error': 'Passoword is too short'})

    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(email=username)
        if user.check_password(password):
            usr_dict = UserModel.objects.filter(
                email=username).values().first()
            usr_dict.pop('password')

            if user.session_token != '0':
                user.session_token = '0'
                user.save()
                return JsonResponse({'error': 'Session already exists'})
            token = generate_session_token()
            user.session_token = token
            user.save()
            login(request, user)
            return JsonResponse({'token': token, 'user': usr_dict})
        else:
            return JsonResponse({'error': 'Invalid password'})
    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid email'})


@csrf_exempt
def signout(request, id):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"
        user.save()
    except UserModel.DoesNotExist:
        return JsonResponse({'error': "Invalid user id"})
    logout(request)

    return JsonResponse({'success': 'Logout sucess'})


class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create': [AllowAny]}
    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]


# NOTE: books section

class BooksViewSet(viewsets.ModelViewSet):
    queryset = Books.objects.all()
    serializer_class = BooksSerializer


# Show books

@csrf_exempt
def addBooks(request, id, token):
    if not validateUserSession(id, token):
        return JsonResponse({'error': 'Unexpected logout, Please re-login'})

    if request.method == "POST":
        bookTitle = request.POST.get('title')
        print(bookTitle, "hey")
        bookDescription = request.POST.get('description')
        bookAuthor = request.POST.get('author')
        bookSubject = request.POST.get('subject')
        bookEdition = request.POST.get('edition')

        userModel = get_user_model()
        try:
            user = userModel.objects.get(pk=id)
        except userModel.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'})

        qry = Books.objects.create(title=bookTitle, description=bookDescription,
                                   author=bookAuthor, edition=bookEdition, subject=bookSubject, user=user)
        qry.save()
        return JsonResponse({'success': 'True', 'error': 'False', 'msg': f'{bookTitle} added successfully', 'code': '201'})
