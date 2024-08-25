from django.urls import path
from . import views

urlpatterns = [
    path("scouting/", views.scouting, name="scouting"),
    path("display/", views.display, name="display")
]