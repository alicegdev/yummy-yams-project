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
exports.Pastry = void 0;
const database_1 = require("../database");
class Pastry {
    constructor(name = '', image = '', stock = 0, quantityWon = 0) {
        this.name = name;
        this.image = image;
        this.stock = stock;
        this.quantityWon = quantityWon;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                return yield ((_a = database_1.database.pastriesCollection) === null || _a === void 0 ? void 0 : _a.find().toArray());
            }
            catch (err) {
                console.error('Erreur lors de la recherche des pâtisseries :', err);
                return [];
            }
        });
    }
}
exports.Pastry = Pastry;
