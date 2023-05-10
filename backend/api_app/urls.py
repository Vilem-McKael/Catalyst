from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostListCreateView.as_view(), name='posts_list_create'),
    path('posts/<int:post_id>/', views.PostRetrieveUpdateDeleteView.as_view(), name="post_detail"),
    path('posts/<int:collectiv_id>/get_posts', views.get_posts_by_collectiv, name="get_post_by_id"),
    path('collectivs/', views.CollectivListCreateView.as_view(), name='posts_list_create'),
    path('collectivs/<int:collectiv_id>/', views.CollectivRetrieveUpdateDeleteView.as_view(), name="post_detail"),
    path('comments/', views.PostListCreateView.as_view(), name='posts_list_create'),
    path('posts/<int:comment_id>/', views.PostRetrieveUpdateDeleteView.as_view(), name="post_detail"),
]