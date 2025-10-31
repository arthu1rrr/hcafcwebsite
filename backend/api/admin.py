from django.contrib import admin
from .models import Team
# Register your models here.

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name','code','created_at','updated_at')
    search_fields = ('name','code')
    ordering = ('name',)