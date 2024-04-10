#!/bin/bash

mongoimport --db='yummy-yams-db' --collection='pastries' --file='/tmp/pastries.json' --jsonArray --username='root' --password='foobar' --authenticationDatabase=admin

# Créer des collections supplémentaires
mongo --eval "db.createCollection('users')"
mongo --eval "db.createCollection('winners')"