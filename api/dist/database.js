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
exports.database = exports.app = void 0;
const express = require('express');
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
class Database {
    constructor() {
        this.db = null;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                exports.app.use((0, cors_1.default)());
                exports.app.use(express.json());
                exports.app.use(body_parser_1.default.json());
                dotenv_1.default.config();
                const username = process.env.MONGO_USERNAME;
                const password = process.env.MONGO_PASSWORD;
                const database = process.env.MONGO_DBNAME;
                yield mongoose_1.default.connect(`mongodb://${username}:${password}@127.0.0.1:27017/${database}?retryWrites=true&w=majority`) // mongo:27017 pour lancer avec docker  // localhost:27017 pour lancer en local
                    .then(() => {
                    console.log('Connexion à MongoDB réussie');
                })
                    .catch((error) => {
                    console.error('Erreur de connexion à MongoDB :', error);
                });
            }
            catch (err) {
                console.error('Erreur de connexion à la base de données :', err);
            }
        });
    }
}
exports.app = express();
exports.database = new Database();
