const express = require('express');
import { Application } from 'express';
import { MongoClient, Db, Collection } from 'mongodb';

class Database {
    private client: MongoClient;
    public db: Db | null;
    public pastriesCollection: Collection<any> | null;

    constructor() {
        this.client = new MongoClient('mongodb://localhost:27017');
        this.db = null;
        this.pastriesCollection = null;
    }

    async connect() {
        try {
            await this.client.connect();
            console.log('Connecté à la base de données MongoDB');
            this.db = this.client.db('yummy-yams-db');
            console.log(this.db.collection('pastries').find().toArray());
            this.pastriesCollection = this.db.collection('pastries');
        } catch (err) {
            console.error('Erreur de connexion à la base de données :', err);
        }
    }
}

export const app: Application = express();
export const database: Database = new Database();


