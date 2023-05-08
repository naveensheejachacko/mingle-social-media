from django.urls import path
from user import views

urlpatterns = [

    path('signup',views.SignUp.as_view(),name='signup'),
    path('login',views.Login.as_view(),name='login'),
    path('logout',views.Logout.as_view(),name='logout'),
    path('verifyToken',views.verifyToken,name='verifyToken'),
    path('googleLogin',views.googleLogin.as_view(),name='googleLogin'),
    # path('u',views.UserView.as_view(),name='login'),
    


]