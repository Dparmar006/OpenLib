from django.http import JsonResponse, HttpResponse, Http404

from django.contrib.auth import get_user_model
from django.contrib.auth import login, logout
import random
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import CustomUser, Books
from django.db.models import Count
from .serializers import UserSerializer, BooksSerializer, BooksUpdateSerializer

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
def signup(request, *args, **kwargs):
    if not request.method == 'POST':
        return JsonResponse({'success': 'true', 'error': 'true', 'msg': 'We acccept only post requests'})

    email = request.POST.get('email')
    phone = request.POST.get('phone')
    password = request.POST.get('password')
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')

    if email == "" or password == "" or first_name == "":
        return JsonResponse({'success': 'false', 'error': 'true', 'msg': 'These fields can not be blank'})

    regex = '[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'

    if(re.match(regex, str(email))):
        print("valid Email")
    else:
        return JsonResponse({'success': 'false', 'error': 'true', 'msg': 'Please, Enter a vaid email address'})

    if len(password) < 4:
        return JsonResponse({'success': 'false', 'error': 'true', 'msg': 'Passoword is too short'})

    userModel = get_user_model()
    try:
        userExist = userModel.objects.get(email=email)
        return JsonResponse({'success': 'false', 'error': 'true', 'msg': 'Account with this email already exist '})
    except:
        qry = CustomUser.objects.create(
            email=email,  phone=phone, first_name=first_name, last_name=last_name)
        qry.set_password(password)
        qry.save()
        if qry:
            return JsonResponse({'success': 'true', 'error': 'false', 'msg': 'Account created !'})
    return JsonResponse({'error': 'true', 'success': 'false', 'msg': 'Something went wrong'})


@csrf_exempt
def signin(request, *args, **kwargs):
    if not request.method == 'POST':
        return JsonResponse({'success': 'true', 'error': 'true', 'msg': 'We acccept only post requests'})

    username = request.POST.get('email')
    password = request.POST.get('password')

    if username == "" or password == "":
        return JsonResponse({'success': 'false', 'error': 'true', 'msg': 'Please enter values'})

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
                return JsonResponse({'msg': 'Session already exists'})
            token = generate_session_token()
            user.session_token = token
            user.save()
            login(request, user)
            return JsonResponse({'token': token, 'user': usr_dict})
        else:
            return JsonResponse({'success': 'true', 'error': 'true', 'msg': 'Invalid password'})
    except UserModel.DoesNotExist:
        return JsonResponse({'success': 'true', 'error': 'true', 'msg': 'Invalid email'})

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
    queryset = Books.objects.annotate(
        num_authors=Count('like')).order_by('-num_authors')
    serializer_class = BooksSerializer
    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        book = request.data['file']
        userid = request.data.get('id')
        bookTitle = request.data.get('title')
        bookDescription = request.data.get('description')
        bookAuthor = request.data.get('author')
        bookSubject = request.data.get('subject')
        bookStream = request.data.get('stream')
        bookEdition = request.data.get('edition')

        if bookTitle == "" or bookDescription == "" or bookAuthor == "" or bookSubject == "" or bookStream == "":
            return JsonResponse({'success': 'false', 'error': 'true', 'msg': 'Please enter values'})

        if not book:
            return JsonResponse({'success': 'false', 'error': 'true', 'msg': 'Please, select a book to upload'})

        try:
            bookWithTitle = Books.objects.get(title=bookTitle)
            return JsonResponse({'success': 'false', 'error': 'true', 'msg': 'Book with this title already exists, Please give new title'})
        except:
            pass

        userModel = get_user_model()
        try:
            user = userModel.objects.get(pk=userid)
        except userModel.DoesNotExist:
            return JsonResponse({'success': 'false', 'error': 'true', 'msg': 'Authentication failed, Please re-login'})

        Books.objects.create(title=bookTitle, description=bookDescription,
                             author=bookAuthor, edition=bookEdition, subject=bookSubject, stream=bookStream, uploaded_by=user, file=book)
        return JsonResponse({'success': 'true', 'error': 'false', 'msg': 'book added'})


@csrf_exempt
def addBook(request, id, token, *args, **kwargs):
    print("called")

    if not validateUserSession(id, token):
        return JsonResponse({'error': 'Unexpected logout, Please re-login'})

    if request.method == "POST":
        # files
        print("entered into files")
        # print(request.FILES)
        # bookFile = request.FILES['file']
        # fs = FileSystemStorage()
        # fileName = fs.save(bookFile.name, bookFile)
        # uploaded_file_url = fs.url(bookFile)
        # uploaded_file_url = uploaded_file_url.replace("/media/", "")
        # print(uploaded_file_url)

        print(bookTitle, "hey")
        bookTitle = request.data.get('title')
        bookDescription = request.data.get('description')
        bookAuthor = request.data.get('author')
        bookSubject = request.data.get('subject')
        bookEdition = request.data.get('edition')

        userModel = get_user_model()
        try:
            user = userModel.objects.get(pk=id)
        except userModel.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'})

        qry = Books.objects.create(title=bookTitle, description=bookDescription,
                                   author=bookAuthor, edition=bookEdition, subject=bookSubject, uploaded_by=user)
        qry.save()
        return JsonResponse({'success': 'true', 'error': 'false', 'msg': f'{bookTitle} added successfully', 'code': '201'})
    else:
        return JsonResponse({'success': 'false', 'error': 'true', 'msg': 'send a valid request', 'code': '400'})


@csrf_exempt
def removeBook(request, bookId, id, token):
    if not validateUserSession(id, token):
        return JsonResponse({'success': 'false', 'error': 'true', 'msg': 'Authentication failed, please re-login'})
    if request.method == "POST":
        book = Books.objects.get(id=bookId)
        if book.uploaded_by == request.user:
            Books.objects.get(id=bookId).delete()
            return JsonResponse({'success': 'True', 'error': 'False', 'msg': 'Book DELETED successfully', 'code': '201'})
        else:
            return JsonResponse({'success': 'False', 'error': 'True', 'msg': 'You can\'t delete other people\'s books', 'code': '404'})
    return JsonResponse({'success': 'False', 'error': 'True', 'msg': 'Could not delete this book, Might alredy have been deleted', 'code': '404'})


@csrf_exempt
def perfromActionOnBook(request, bookId, userId, action):
    action = str(action).lower().strip()
    if request.method == 'POST':
        userModel = get_user_model()
        try:
            user = userModel.objects.get(pk=userId)
            print(user)
        except userModel.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'})
        if action == 'like':
            book = Books.objects.get(pk=bookId)
            book.like.add(user)
            book.save()
            return JsonResponse({'success': 'true', 'error': 'false', 'msg': 'You liked a book'})
        elif action == 'unlike':
            book = Books.objects.get(pk=bookId)
            book.like.remove(user)
            book.save()
            return JsonResponse({'success': 'true', 'error': 'false', 'msg': 'You unliked a book'})
        else:
            return JsonResponse({'success': 'false', 'error': 'true', 'msg': 'Wrong URL/action on book'})
    return JsonResponse({'error': 'true', 'success': 'false', 'msg': 'An error occured, Please do it again !'})


@csrf_exempt
def isAlreadyLiked(request, userId, bookId):
    userModel = get_user_model()
    try:
        user = userModel.objects.get(pk=userId)
    except:
        return JsonResponse({'success': 'false', 'error': 'true', 'msg': 'Unauthorized, Please login again.'})
    likedBooks = Books.objects.filter(like=user).values('pk')
    for like in likedBooks:
        if like.get('pk') == int(bookId):
            return JsonResponse({'success': 'true', 'error': 'false', 'msg': 'liked', 'like': 'true'})
    return JsonResponse({'success': 'true', 'error': 'false', 'msg': 'Not Liked', 'like': 'false'})
