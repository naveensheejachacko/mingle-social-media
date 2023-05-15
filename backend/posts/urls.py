
from django.urls import path
from .import views

urlpatterns = [
    path('addposts/<int:id>',views.addposts,name='addposts'),
    path('getPosts',views.getPosts,name='getPosts'),
    path('deletePost/<int:id>',views.deletePost,name='deletePost'),

    # likes
    path('isliked/<id>/',views.isliked,name='isliked'),


    # comment
    path('addcomments/<id>/<id2>/',views.addcomments,name='addcomments'),
    path('getcomments/<id>/',views.getcomments,name='getcomments'),
    path('deletecomment/<id>/',views.deletecomment,name='deletecomment'),


    #Fetch User Post
    path('userPost/<id>/',views.userPost,name='userPost'),


    #follow 
    path('follow_user/<int:user_id>/<int:fingId>/',views.follow_user,name=" follow_user"),
    path('user_suggestions/<id>/',views.user_suggestions,name="user_suggestions"),


]