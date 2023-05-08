
from django.urls import path
from .import views

urlpatterns = [
    path('addposts/<int:id>',views.addposts,name='addposts'),
    path('getPosts',views.getPosts,name='getPosts'),


    path('isliked/<id>/',views.isliked,name='isliked'),
    path('addcomments/<id>/<id2>/',views.addcomments,name='addcomments'),

]