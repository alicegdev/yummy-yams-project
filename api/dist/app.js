"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
// Configuration de l'application Express
const app = (0, express_1.default)();
const port = 3000;
// Middleware pour parser le corps des requêtes en JSON
app.use(express_1.default.json());
// URL de connexion à MongoDB
const uri = 'mongodb://localhost:27017';
const client = new mongodb_1.MongoClient(uri);
// Middleware pour se connecter à la base de données MongoDB avant de gérer les requêtes
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connexion à la base de données MongoDB
        yield client.connect();
        console.log('Connecté à MongoDB');
        // simple route
        // Passer à la prochaine fonction middleware ou à la gestion de la route
        next();
    }
    catch (error) {
        console.error('Erreur lors de la connexion à MongoDB :', error);
        res.status(500).send('Erreur lors de la connexion à la base de données');
    }
}));
// Route de test pour vérifier la connexion à MongoDB
// Route GET pour récupérer des données de la base de données MongoDB
app.get('/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("Yes we can");
    }
    catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).send('Erreur lors de la récupération des données depuis la base de données');
    }
}));
// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
