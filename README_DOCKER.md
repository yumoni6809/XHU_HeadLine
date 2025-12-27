# Docker usage for XHU_HeadLine

Build images:

docker compose build

Run all services in background:

docker compose up -d

View logs:

docker compose logs -f

Notes:
- Backend exposes port 8080; admin UI on 8081; user UI on 8082.
- The backend may need database configuration; update src/main/resources/application.properties or provide environment vars before running.
