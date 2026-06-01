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

## API

- `GET /health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/submissions`
- `POST /api/submissions`

The React app should use:

```env
VITE_API_BASE_URL=http://localhost:8000
```
