from django.core.management.base import BaseCommand
from octofit_tracker.models import Activity, Leaderboard, Team, User, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        marvel = Team.objects.create(name='team marvel')
        dc = Team.objects.create(name='team dc')

        users = [
            User(superhero_name='Iron Man', email='tony.stark@octofit.dev', team=marvel),
            User(superhero_name='Captain America', email='steve.rogers@octofit.dev', team=marvel),
            User(superhero_name='Batman', email='bruce.wayne@octofit.dev', team=dc),
            User(superhero_name='Superman', email='clark.kent@octofit.dev', team=dc),
            User(superhero_name='Wonder Woman', email='diana.prince@octofit.dev', team=dc),
            User(superhero_name='Spider-Man', email='peter.parker@octofit.dev', team=marvel),
        ]
        User.objects.bulk_create(users)
        users = list(User.objects.order_by('superhero_name'))

        activities = [
            Activity(user=users[0], type='Strength Training', duration=50, calories=480),
            Activity(user=users[1], type='Sprint Intervals', duration=35, calories=390),
            Activity(user=users[2], type='Night Cycling', duration=60, calories=520),
            Activity(user=users[3], type='Flight Core Drills', duration=45, calories=430),
            Activity(user=users[4], type='Combat Circuit', duration=55, calories=500),
            Activity(user=users[5], type='Agility Run', duration=40, calories=360),
        ]
        Activity.objects.bulk_create(activities)

        workouts = [
            Workout(name='Avengers HIIT', description='Explosive HIIT block focused on speed and endurance.'),
            Workout(name='Justice League Strength', description='Full body strength plan with compound lifts.'),
            Workout(name='Hero Mobility', description='Low-impact mobility and flexibility routine.'),
        ]
        Workout.objects.bulk_create(workouts)

        Leaderboard.objects.bulk_create(
            [
                Leaderboard(team=marvel, points=1730),
                Leaderboard(team=dc, points=1860),
            ]
        )

        self.stdout.write(self.style.SUCCESS('Populated octofit_db with superhero test data.'))
