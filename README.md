# GetStrength Website

## Project structure
- `frontend/`: Next.js (React), built as a static site for S3 + CloudFront
- `backend/`: Java Spring Boot (role still being confirmed; currently a health check)
- `docker-compose.yml`: runs everything locally

Docker is for local development only. Production is static files on AWS, with no containers.

## Getting started
1. Install Docker Desktop. On Windows, enable WSL2, keep this repo inside Ubuntu (not on C:), and turn on
   Docker Desktop → Settings → Resources → WSL Integration → Ubuntu.
2. `cp .env.example .env`
3. `docker compose up --build`
4. Open http://localhost:3000

The first run takes a few minutes while everything downloads.

## Useful addresses
- Website: http://localhost:3000
- Backend health check: http://localhost:3000/api/health (should say "ok")
- Test email inbox (Mailpit): http://localhost:8025

## Everyday commands
- Stop everything: `docker compose down`
- After changing Java code: `docker compose restart backend`
- Install a frontend package: `docker compose exec frontend npm install <name>`
- After pulling changes that add packages: `docker compose up --build -V`

## Production builds
- Frontend: `docker compose run --rm frontend npm run build` (static site goes to `frontend/out/`, which is what gets uploaded to S3)
- Backend: `docker compose run --rm backend mvn package`

## Troubleshooting
- `frontend/out` and `backend/target` are created by Docker, so delete them with `sudo rm -rf ...`
- "next: not found" or missing packages: run `docker compose up --build -V`
- Page not updating after an edit: check the terminal running `docker compose up` for errors
