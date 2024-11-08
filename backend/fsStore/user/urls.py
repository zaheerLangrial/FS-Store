from django.urls import path
from .views import SignUpView, SignInView, UserDetailView

urlpatterns = [
    path('api/signup/', SignUpView.as_view()),
    path('api/signin/', SignInView.as_view()),
    path('api/users/<int:pk>/', UserDetailView.as_view({'get': 'retrieve'})),
]
