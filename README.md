sudo dockerd to launch Docker

In WSL:
-> To connect to DB
  docker compose up -d
  docker exec -it yummy-yams-project-mongo-1 bash
  mongosh -u root -p foobar

To launch backend:
cd api
tsc
npm run start

To launch frontend: 
cd app
npm run dev