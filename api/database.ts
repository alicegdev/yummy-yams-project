const express = require('express');
import { Application } from 'express';
import { MongoClient, Db, Collection } from 'mongodb';
import cors from "cors";
import mongoose from 'mongoose';

class Database {
    public db: Db | null;
    public pastriesCollection: Collection<any> | null;

    constructor() {
        this.db = null;
        this.pastriesCollection = null;
    }

    async connect() {
        try {
            // await this.client.connect();
            // console.log('Connecté à la base de données MongoDB');
            // this.db = this.client.db('yummy-yams-db');
            // this.pastriesCollection = this.db.collection('pastries');
            app.use(cors())
            app.use(express.json())
            const username = 'root'
            const password = 'foobar'
            const database = 'yummy-yams-db'

            await mongoose.connect(`mongodb://${username}:${password}@127.0.0.1:27017/${database}?retryWrites=true&w=majority`)  // mongo:27017 pour lancer avec docker  // localhost:27017 pour lancer en local
                .then(() => {
                    console.log('Connexion à MongoDB réussie')
                })
                .catch((error) => {
                    console.error('Erreur de connexion à MongoDB :', error)
                })
        } catch (err) {
            console.error('Erreur de connexion à la base de données :', err);
        }
    }
}

export const app: Application = express();
export const database: Database = new Database();


