from django.urls import path

from .views import health,team_list,team_detail

urlpatterns = [
    
    path('health/', health, name='api-health'),
    path('teams/', team_list, name='apiteam-list'),
    path('teams/<int:pk>/', team_detail, name='api-team-detail'),
]
