
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("profile", views.profile, name="profile"),
    path("publish", views.publish, name="publish"),
    path("profile_view/<str:username>",views.profile_view,name="profile_view"),
    path("follow/<str:username>",views.follow,name="follow"),
    path("unfollow/<str:username>",views.unfollow,name="unfollow"),
    path("following",views.following,name="following"),
    path("edit",views.edit,name="edit"),
    path("like",views.like,name="like"),
    path("delete",views.delete,name="delete"),
]
