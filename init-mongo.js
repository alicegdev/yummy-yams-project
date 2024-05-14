db = db.getSiblingDB("yummy-yams-db");
db.createCollection("pastries");
db.createUser({
  user: "root",
  pwd: "foobar",
  roles: [{ role: "readWrite", db: "yummy-yams-db" }],
});
