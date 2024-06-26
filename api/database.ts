const express = require('express');
import { Application } from 'express';
import { Db } from 'mongodb';
import cors from "cors";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from "body-parser";

class Database {
    public db: Db | null;

    constructor() {
        this.db = null;
    }

    async connect() {
        try {
            app.use(cors())
            app.use(express.json())
            app.use(bodyParser.json());
            dotenv.config();

            const username = process.env.MONGO_USERNAME;
            const password = process.env.MONGO_PASSWORD;
            const database = process.env.MONGO_DBNAME;

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


