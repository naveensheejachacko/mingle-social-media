from django.urls import path
from adminapp import views

urlpatterns = [
    path('',views.AdminLogin.as_view(),name='adminLogin'),
    # path('adminLogout',views.AdminLogout.as_view(),name='adminLogout'),
    path('user/<int:user_id>/', views.UserView.as_view()),
    path('userlist',views.UserList.as_view(),name='userlist'),
     path('block-unblock-user/<int:user_id>/',views.BlockUnblockUserView.as_view()),
    # path('blockorunblock/<int:id>',views.BlockOrUnblockUser.as_view(),name='blockorunblock'),
    # path('block-user/<int:user_id>/', views.BlockUser.as_view(), name='block-user'),
    # path('unblock-user/<int:user_id>/', views.UnblockUser.as_view(), name='unblock-user'),
]
