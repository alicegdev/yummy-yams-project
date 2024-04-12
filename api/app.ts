import express from "express";
import { MongoClient } from 'mongodb';
import { Pastry } from "./models/Pastry"
import { database } from "./database";

// Configuration de l'application Express
export const app = express();
const port = 3000;

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

database.connect()

// Route de test pour vérifier la connexion à MongoDB
// Route GET pour récupérer des données de la base de données MongoDB
app.get('/data', async (req, res) => {
    try {
        res.json({ 'pastries collection': new Pastry().findAll() });
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).send('Erreur lors de la récupération des données depuis la base de données');
    }
});


// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
