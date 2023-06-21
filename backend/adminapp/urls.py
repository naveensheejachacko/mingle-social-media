from django.urls import path
from adminapp import views

urlpatterns = [
    path('',views.AdminLogin.as_view(),name='adminLogin'),
    # path('adminLogout',views.AdminLogout.as_view(),name='adminLogout'),
    path('user/<int:user_id>/', views.UserView.as_view()),
    path('userlist',views.UserList.as_view(),name='userlist'),
    path('block-unblock-user/<int:user_id>/',views.BlockUnblockUserView.as_view()),
    path('approveReport/<int:reportId>/', views.ApproveReportView.as_view()),
    path('rPostList',views.ReportedPosts.as_view(),name='rPostList'),
    path('rPost/<int:reportId>/', views.rPostView.as_view()),
    path('getPostById/<int:postId>/', views.PostByIdView.as_view()),

]
