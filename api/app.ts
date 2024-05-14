import express from "express";
import { MongoClient } from 'mongodb';
import Pastry from "./models/Pastry"
import { database } from "./database";

// Configuration de l'application Express
export const app = express();
const port = 3000;

// Route de test pour vérifier la connexion à MongoDB
// Route GET pour récupérer des données de la base de données MongoDB
app.get('/pastries', async (res: { json: (arg0: { 'pastries collection': any; }) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    try {
        res.json({
            'pastries collection': Pastry.find()
                .then((pastries) => {
                    console.log("Found pastries:", pastries);
                })
                .catch((error) => {
                    console.error("Error finding pastries:", error);
                })
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).send('Erreur lors de la récupération des données depuis la base de données');
    }
});


// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
