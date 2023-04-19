from django.urls import path
from user import views

urlpatterns = [

    path('signup',views.SignUp.as_view(),name='signup'),
    path('login',views.Login.as_view(),name='login'),
    path('logout',views.Logout.as_view(),name='logout'),
    # path('u',views.UserView.as_view(),name='login'),
]