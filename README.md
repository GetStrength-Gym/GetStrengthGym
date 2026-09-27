# GetStrength Website

## Getting started
1. Install Docker Desktop (Windows: enable WSL2, turn on WSL Integration for Ubuntu, and keep this repo inside Ubuntu, not on C:)
2. `cp .env.example .env`
3. `docker compose up --build`
4. Open http://localhost:5173

The first run takes a few minutes while everything downloads.

## Useful addresses
- Website: http://localhost:5173
- Backend health check: http://localhost:5173/api/health (should say "ok")
- Test email inbox: http://localhost:8025

## Everyday commands
- Stop everything: `docker compose down`
- After changing Java code: `docker compose restart backend`
- Install a frontend package: `docker compose exec frontend npm install <name>`
- After pulling changes that add packages: `docker compose up --build -V`

## Checking the production builds
- Frontend: `docker compose run --rm frontend npm run build`
- Backend: `docker compose run --rm backend mvn package`

## Troubleshooting
- Files like `frontend/dist` and `backend/target` are created by Docker, so delete them with `sudo rm -rf ...`
- Page not updating after a frontend change? Check the terminal running `docker compose up` for errors.
