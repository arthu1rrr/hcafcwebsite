from django.contrib import admin
from .models import Team,Player,Match
# Register your models here.

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name','code','created_at','updated_at')
    search_fields = ('name','code')
    ordering = ('name',)

@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'primary_team', 'position', 'shirt_number', 'is_active', 'is_committee')
    search_fields = ('first_name', 'last_name', 'primary_team__name')
    list_filter = ('primary_team', 'position', 'is_active', 'is_committee')
    ordering = ('last_name', 'first_name')

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ('date', 'match_team', 'team_against', 'competition', 'home_match', 'match_completed', 'home_team_score', 'away_team_score','venue')
    search_fields = ('match_team__name', 'team_against', 'competition')
    list_filter = ('home_match', 'match_completed','match_team')
    ordering = ('-date',)