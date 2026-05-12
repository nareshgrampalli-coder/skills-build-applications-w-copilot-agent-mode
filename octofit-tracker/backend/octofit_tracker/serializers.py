from rest_framework import serializers

from .models import Activity, Leaderboard, Team, User, Workout


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = ['id', 'name']

    def get_id(self, obj):
        return str(obj.pk)


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    team = serializers.SerializerMethodField()
    team_id = serializers.PrimaryKeyRelatedField(
        source='team',
        queryset=Team.objects.all(),
        write_only=True,
        required=False,
        allow_null=True,
    )

    class Meta:
        model = User
        fields = ['id', 'superhero_name', 'email', 'team', 'team_id']

    def get_id(self, obj):
        return str(obj.pk)

    def get_team(self, obj):
        return str(obj.team_id) if obj.team_id else None


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    user_id = serializers.PrimaryKeyRelatedField(
        source='user',
        queryset=User.objects.all(),
        write_only=True,
    )

    class Meta:
        model = Activity
        fields = ['id', 'user', 'user_id', 'type', 'duration', 'calories']

    def get_id(self, obj):
        return str(obj.pk)

    def get_user(self, obj):
        return str(obj.user_id)


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    team = serializers.SerializerMethodField()
    team_id = serializers.PrimaryKeyRelatedField(
        source='team',
        queryset=Team.objects.all(),
        write_only=True,
    )

    class Meta:
        model = Leaderboard
        fields = ['id', 'team', 'team_id', 'points']

    def get_id(self, obj):
        return str(obj.pk)

    def get_team(self, obj):
        return str(obj.team_id)


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Workout
        fields = ['id', 'name', 'description']

    def get_id(self, obj):
        return str(obj.pk)
