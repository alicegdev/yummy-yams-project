import express from "express";
import { MongoClient } from 'mongodb';

// Configuration de l'application Express
const app = express();
const port = 3000;

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// URL de connexion à MongoDB
const uri = 'mongodb://localhost:27017';

// Middleware pour se connecter à la base de données MongoDB avant de gérer les requêtes
app.use(async (req, res, next) => {
    const client = new MongoClient(uri);
    try {
        // Connexion à la base de données MongoDB
        await client.connect();
        console.log('Connecté à MongoDB');

        // Passer à la prochaine fonction middleware ou à la gestion de la route
        next();
    } catch (error) {
        console.error('Erreur lors de la connexion à MongoDB :', error);
        res.status(500).send('Erreur lors de la connexion à la base de données');
    }
});

// Route de test pour vérifier la connexion à MongoDB


// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
