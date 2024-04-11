In WSL:
-> To connect to DB
  docker compose up -d
  docker exec -it yummy-yams-project-mongo-1 bash
  mongosh -u root -p foobar
