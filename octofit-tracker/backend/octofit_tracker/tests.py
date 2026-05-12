from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelSmokeTest(TestCase):
    def test_team_create(self):
        team = Team.objects.create(name="test team")
        self.assertEqual(str(team), "test team")

    def test_user_create(self):
        team = Team.objects.create(name="test team")
        user = User.objects.create(superhero_name="Test Hero", email="hero@test.com", team=team)
        self.assertEqual(str(user), "Test Hero (hero@test.com)")

    def test_activity_create(self):
        team = Team.objects.create(name="test team")
        user = User.objects.create(superhero_name="Test Hero", email="hero@test.com", team=team)
        activity = Activity.objects.create(user=user, type="Run", duration=30, calories=100)
        self.assertIn("Run", str(activity))

    def test_workout_create(self):
        workout = Workout.objects.create(name="Test Workout", description="desc")
        self.assertIn("Test Workout", str(workout))

    def test_leaderboard_create(self):
        team = Team.objects.create(name="test team")
        leaderboard = Leaderboard.objects.create(team=team, points=123)
        self.assertIn("test team", str(leaderboard))
