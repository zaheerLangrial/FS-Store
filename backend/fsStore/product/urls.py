from django.urls import path
from .views import ProductListCreateView, CategoryListCreateView, RequestZarortMandView, RequestStatusUpdateView

urlpatterns = [
    path('api/categories/', CategoryListCreateView.as_view()),
    path('api/products/', ProductListCreateView.as_view()),
    # path('api/request/', RequestView.as_view()),
        # URL for creating a request by zarorat_mand user
    path('create-request/', RequestZarortMandView.as_view()),

    # URL for the product creator to accept or reject the request
    path('update-request-status/<int:pk>/', RequestStatusUpdateView.as_view()),
]
