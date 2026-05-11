from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "superhero_name", "email", "team")
    search_fields = ("superhero_name", "email")
    list_filter = ("team",)

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "type", "duration", "calories")
    search_fields = ("type", "user__superhero_name")
    list_filter = ("type",)

@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ("id", "team", "points")
    search_fields = ("team__name",)

@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description")
    search_fields = ("name",)
