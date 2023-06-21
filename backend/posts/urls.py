
from django.urls import path
from .import views

urlpatterns = [
    path('addposts/<int:id>', views.addposts, name='addposts'),
    path('getPosts/<int:user_id>/<page>', views.getPosts, name='getPosts'),
    path('deletePost/<int:id>', views.deletePost, name='deletePost'),
    path('reportPost/<int:postId>/<int:userId>', views.reportPost, name='reportPost'),


    # likes
    path('isliked/<id>/', views.isliked, name='isliked'),


    # comment
    path('addcomments/<id>/<id2>/', views.addcomments, name='addcomments'),
    path('getcomments/<id>/', views.getcomments, name='getcomments'),
    path('deletecomment/<id>/', views.deletecomment, name='deletecomment'),


    # Fetch User Post
    path('userPost/<id>/', views.userPost, name='userPost'),


    # follow
    path('fposts/<int:user_id>/', views.fposts, name='fposts'),
    path('following_list/<int:user_id>/',
         views.following_list, name="following_list"),
    path('followers_list/<int:user_id>/',
         views.followers_list, name='followers_list'),
    path('follow_user/<int:user_id>/<int:fingId>/',
         views.follow_user, name="follow_user"),
    # path('unfollow_user/<int:user_id>/<int:fingId>/',views.unfollow_user,name="unfollow_user"),

    path('user_suggestions/<id>/', views.user_suggestions, name="user_suggestions"),    
    path('removeSuggestion/<userId>/<suggestionId>/', views.removeSuggestion, name="removeSuggestion"),


]
