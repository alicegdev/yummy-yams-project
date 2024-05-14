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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const Pastry_1 = __importDefault(require("./models/Pastry"));
const database_1 = require("./database");
// Configuration de l'application Express
exports.app = (0, express_1.default)();
const port = 3000;
// Middleware pour parser le corps des requêtes en JSON
exports.app.use(express_1.default.json());
database_1.database.connect();
// Route de test pour vérifier la connexion à MongoDB
// Route GET pour récupérer des données de la base de données MongoDB
exports.app.get('/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            'pastries collection': Pastry_1.default.find()
                .then((pastries) => {
                console.log("Found pastries:", pastries);
            })
                .catch((error) => {
                console.error("Error finding pastries:", error);
            })
        });
    }
    catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).send('Erreur lors de la récupération des données depuis la base de données');
    }
}));
// Démarrage du serveur
exports.app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
