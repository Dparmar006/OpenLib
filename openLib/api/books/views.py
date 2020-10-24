from django.http import JsonResponse, HttpResponse, Http404

from django.contrib.auth import get_user_model
from django.contrib.auth import login, logout
import random
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import CustomUser, Books
from .serializers import UserSerializer, BooksSerializer

import re
from django.core.files.storage import FileSystemStorage
# Create your views here.

# NOTE: USER OPERATIONS ["VALIDATE_USER_SESSION", "GENERATE_SESSION_TOKEN", "SIGNIN", "SIGNOUT", "USER_VIEW_SETS"]


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
    password = request.POST.get('password')

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

    return JsonResponse({'error': 'true', 'success': 'false', 'msg': 'Something went wrong'})


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


# NOTE: BOOK OPERATIONS ["ADD", "REMOVE", "VIEW"]

class BooksViewSet(viewsets.ModelViewSet):
    queryset = Books.objects.all()
    serializer_class = BooksSerializer
    authentication_classes = []
    permission_classes = []
    # permission_classes_by_action = {'create': [AllowAny]}

    # def get_permissions(self):
    #     try:
    #         return [permission() for permission in self.permission_classes_by_action[self.action]]
    #     except KeyError:
    #         return [permission() for permission in self.permission_classes]

    def post(self, request, *args, **kwargs):
        book = request.data['file']
        bookTitle = request.data.get('title')
        bookDescription = request.data.get('description')
        bookAuthor = request.data.get('author')
        bookSubject = request.data.get('subject')
        bookEdition = request.data.get('edition')
        bookOwner = request.data.get('uploaded_by')
        liked_by = request.data.get('like')
        print(request.data)
        userModel = get_user_model()
        try:
            user = userModel.objects.get(pk=request.user)
        except userModel.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'})

        qry = Books.objects.create(title=bookTitle, description=bookDescription,
                                   author=bookAuthor, edition=bookEdition, subject=bookSubject, uploaded_by=bookOwner, file=book, like=liked_by)
        qry.save()
        return JsonResponse({'success': 'true', 'error': 'false', 'msg': 'book added'})


@csrf_exempt
def addBook(request, id, token, *args, **kwargs):
    print("called")

    if not validateUserSession(id, token):
        return JsonResponse({'error': 'Unexpected logout, Please re-login'})

    if request.method == "POST":
        # files
        print("entered into files")
        print(request.FILES)
        bookFile = request.FILES['file']
        fs = FileSystemStorage()
        fileName = fs.save(bookFile.name, bookFile)
        uploaded_file_url = fs.url(bookFile)
        uploaded_file_url = uploaded_file_url.replace("/media/", "")
        print(uploaded_file_url)

        print(bookTitle, "hey")
        bookTitle = request.POST.get('title')
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
                                   author=bookAuthor, edition=bookEdition, subject=bookSubject, uploaded_by=user, file=uploaded_file_url)
        qry.save()
        return JsonResponse({'success': 'true', 'error': 'false', 'msg': f'{bookTitle} added successfully', 'code': '201'})
    else:
        return JsonResponse({'success': 'false', 'error': 'true', 'msg': 'send a valid request', 'code': '400'})


@csrf_exempt
def removeBook(request, bookId, id, token):
    if not validateUserSession(id, token):
        return JsonResponse({'error': 'Unexpected logout, Please re-login'})
    if request.method == "POST":
        book = Books.objects.get(id=bookId)
        if book.uploaded_by == request.user:
            Books.objects.get(id=bookId).delete()
            return JsonResponse({'success': 'True', 'error': 'False', 'msg': 'Book DELETED successfully', 'code': '201'})
        else:
            return JsonResponse({'success': 'False', 'error': 'True', 'msg': 'You can\'t delete other people\'s books', 'code': '404'})
    return JsonResponse({'success': 'False', 'error': 'True', 'msg': 'Could not delete this book, Might alredy have been deleted', 'code': '404'})


@csrf_exempt
def perfromActionOnBook(request, bookId, action):
    action = str(action).lower().strip()
    if request.method == 'POST':
        if action == 'like':
            book = Books.objects.get(pk=bookId)
            book.like.add(request.user)
            book.save()
            return JsonResponse({'success': 'True', 'error': 'False', 'msg': 'You liked a book'})
        elif action == 'unlike':
            book = Books.objects.get(pk=bookId)
            book.like.remove(request.user)
            book.save()
            return JsonResponse({'success': 'True', 'error': 'False', 'msg': 'You unliked a book'})
        else:
            return JsonResponse({'error': 'True', 'success': 'False', 'msg': 'Wrong URL/action on book'})
    return JsonResponse({'error': 'True', 'success': 'False', 'msg': 'An error occured, Please do it again !'})
