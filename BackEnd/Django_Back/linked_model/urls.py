from django.urls import path
from .views import FileUploadView
from .views import TextUploadView

urlpatterns = [
    path('pdf/', FileUploadView.as_view()),
    path('text/', TextUploadView.as_view()),
]
