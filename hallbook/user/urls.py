# from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('register/',Register.as_view(),name='register'),
    path('login/',Login.as_view(),name='login'),
    path('test-auth/',OnlyAuthenticated.as_view(),name='test-auth'),
    
]