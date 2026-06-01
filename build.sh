#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python ecoverify/manage.py collectstatic --no-input
python ecoverify/manage.py migrate
