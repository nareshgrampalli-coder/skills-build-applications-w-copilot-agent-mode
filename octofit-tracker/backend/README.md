# OctoFit Tracker — Backend

Django REST API backed by MongoDB (via Djongo) for the OctoFit Tracker fitness app.

---

## Prerequisites

- Python 3.10+
- MongoDB running on `localhost:27017` (no auth required)
- Virtual environment in `octofit-tracker/backend/venv`

---

## Setup & Run

All commands are run from the **repository root**.

### 1. Activate the virtual environment

```bash
source octofit-tracker/backend/venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r octofit-tracker/backend/requirements.txt
```

### 3. Apply migrations

```bash
python octofit-tracker/backend/manage.py migrate
```

### 4. Populate the database with test data

```bash
python octofit-tracker/backend/manage.py populate_db
```

### 5. Start the development server

```bash
python octofit-tracker/backend/manage.py runserver 0.0.0.0:8000
```

---

## Verify via curl

```bash
# API root (lists all endpoint URLs)
curl http://localhost:8000/api/

# Users (superheroes)
curl http://localhost:8000/api/users/

# Teams (team marvel, team dc)
curl http://localhost:8000/api/teams/

# Activities
curl http://localhost:8000/api/activities/

# Leaderboard
curl http://localhost:8000/api/leaderboard/

# Workouts
curl http://localhost:8000/api/workouts/
```

---

## Verify via mongosh

```bash
# List collections in octofit_db
mongosh --eval "db.getSiblingDB('octofit_db').getCollectionNames()"

# Sample document from each collection
mongosh --eval "const d=db.getSiblingDB('octofit_db'); ['users','teams','activities','leaderboard','workouts'].forEach(c => print(c + ': ' + JSON.stringify(d[c].findOne())));"

# Confirm unique email index on users
mongosh --eval "db.getSiblingDB('octofit_db').users.getIndexes()"
```

---

## REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/users/` | List or create users |
| GET/PUT/DELETE | `/api/users/<id>/` | Retrieve, update, or delete a user |
| GET/POST | `/api/teams/` | List or create teams |
| GET/PUT/DELETE | `/api/teams/<id>/` | Retrieve, update, or delete a team |
| GET/POST | `/api/activities/` | List or create activities |
| GET/PUT/DELETE | `/api/activities/<id>/` | Retrieve, update, or delete an activity |
| GET/POST | `/api/leaderboard/` | List or create leaderboard entries |
| GET/PUT/DELETE | `/api/leaderboard/<id>/` | Retrieve, update, or delete a leaderboard entry |
| GET/POST | `/api/workouts/` | List or create workouts |
| GET/PUT/DELETE | `/api/workouts/<id>/` | Retrieve, update, or delete a workout |
