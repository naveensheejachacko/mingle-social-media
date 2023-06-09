from django.urls import path
from user import views

from .views import UserProfileSearchView

urlpatterns = [

    path('signup',views.SignUp.as_view(),name='signup'),
    path('login',views.Login.as_view(),name='login'),
    path('OTPLogin',views.OTPLogin.as_view(),name='OTPLogin'),
    path('logout',views.Logout.as_view(),name='logout'),
    path('verifyToken',views.verifyToken,name='verifyToken'),
    path('googleLogin',views.googleLogin.as_view(),name='googleLogin'),
    path('getUserById/<int:user_id>/',views.getUserById,name='getUserById'),


    path('changeProfilePic/<int:user_id>/', views.changeProfilePic, name='changeProfilePic'),
    path('changeCover/<int:user_id>/', views.changeCover, name='changeCover'),
    path('updatePassword/<int:user_id>/', views.updatePassword, name='updatePassword'),
    path('updateUserDetails/<int:user_id>/', views.updateUserDetails, name='updateUserDetails'),

    path('profileSearch/', UserProfileSearchView.as_view(), name='profileSearch'),

]