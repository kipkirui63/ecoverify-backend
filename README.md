# EcoVerify Django Backend

Python/Django API for the React frontend. It stores users, authentication tokens, verification submissions, and uploaded evidence metadata in the configured database.

## Environment

Copy the example file and fill in local secrets:

```bash
cp backend/.env.example backend/.env
```

For the Supabase demo database, set `DATABASE_URL` to your Supabase Postgres connection string.

Use the **Transaction pooler** connection string from Supabase Dashboard > Connect. This avoids local IPv6 connection failures that can happen with the direct database host.

```env
DATABASE_URL=postgresql://postgres.kbsldrdochhsmybpdxuj:<your-password>@<your-pooler-host>.pooler.supabase.com:6543/postgres
```

Do not put `DATABASE_URL`, Supabase passwords, or secret keys in the React frontend.

If your password contains special characters like `@`, `#`, `/`, `?`, or `:`, URL-encode those characters before placing the password in `DATABASE_URL`.

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ecoverify
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

## Render deployment

This repository is ready to deploy as a Render Python web service.

Use the existing `render.yaml` as a Blueprint, or create a manual web service with:

```bash
Build Command: ./build.sh
Start Command: python -m gunicorn --chdir ecoverify ecoverify.wsgi:application --bind 0.0.0.0:$PORT
Health Check Path: /health
```

Set these environment variables in Render:

```env
DJANGO_DEBUG=False
DJANGO_SECRET_KEY=<generated-secret>
DATABASE_URL=<your-supabase-transaction-pooler-url>
DB_SSLMODE=require
CORS_ALLOWED_ORIGINS=<your-frontend-url>
CSRF_TRUSTED_ORIGINS=<your-backend-render-url>,<your-frontend-url>
SECURE_SSL_REDIRECT=True
SECURE_HSTS_SECONDS=31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS=True
SECURE_HSTS_PRELOAD=True
```

After the service has a Render URL, add that URL to the frontend as:

```env
VITE_API_BASE_URL=https://your-backend-name.onrender.com
```

## API

- `GET /health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/profile`
- `POST /api/profile`
- `GET /api/submissions`
- `POST /api/submissions`

The React app should use:

```env
VITE_API_BASE_URL=http://localhost:8000
```
