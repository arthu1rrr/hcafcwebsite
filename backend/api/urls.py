from django.urls import path

from .views import health,team_list,team_detail,player_list,players_detail

urlpatterns = [
    
    path('health/', health, name='api-health'),
    path('teams/', team_list, name='apiteam-list'),
    path('teams/<int:pk>/', team_detail, name='api-team-detail'),
    path('players/', player_list, name='api-players-list-create'),
    path('players/<int:pk>/', players_detail, name='api-players-detail'),
]
