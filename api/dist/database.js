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
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.app = void 0;
const express = require('express');
const mongodb_1 = require("mongodb");
class Database {
    constructor() {
        this.client = new mongodb_1.MongoClient('mongodb://root:foobar@localhost:27017');
        this.db = null;
        this.pastriesCollection = null;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                console.log('Connecté à la base de données MongoDB');
                this.db = this.client.db('yummy-yams-db');
                console.log(this.db.collection('pastries').find().toArray());
                this.pastriesCollection = this.db.collection('pastries');
            }
            catch (err) {
                console.error('Erreur de connexion à la base de données :', err);
            }
        });
    }
}
exports.app = express();
exports.database = new Database();
