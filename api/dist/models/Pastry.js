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
exports.incrementQuantityWon = exports.selectPastryId = exports.getTotalWon = exports.getTotalStock = exports.Pastry = exports.pastrySchema = void 0;
const mongoose_1 = require("mongoose");
exports.pastrySchema = new mongoose_1.Schema({
    name: { type: String },
    image: { type: String },
    stock: { type: Number },
    quantityWon: { type: Number }
}, { collection: "pastries" });
exports.Pastry = (0, mongoose_1.model)("Pastry", exports.pastrySchema);
// Ajout de la méthode statique pour comptabiliser le stock total des pâtisseries
const getTotalStock = () => {
    exports.Pastry.aggregate([
        {
            $group: {
                _id: null,
                totalStock: { $sum: "$stock" }
            }
        }
    ]);
};
exports.getTotalStock = getTotalStock;
// Ajout de la méthode statique pour comptabiliser le stock total des pâtisseries
const getTotalWon = () => {
    exports.Pastry.aggregate([
        {
            $group: {
                _id: null,
                totalWon: { $sum: "$quantityWon" }
            }
        }
    ]);
};
exports.getTotalWon = getTotalWon;
const selectPastryId = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Récupérer tous les IDs des pâtisseries avec un stock supérieur à 0
        const availablePastryIds = yield exports.Pastry.aggregate([
            { $match: { stock: { $gt: 0 } } }, // Filtrer les pâtisseries avec un stock supérieur à 0
            { $group: { _id: null, ids: { $push: "$_id" } } } // Regrouper les IDs des pâtisseries
        ]);
        // Récupérer tous les IDs des pâtisseries avec un stock égal à 0
        const zeroStockPastryIds = yield exports.Pastry.aggregate([
            { $match: { stock: 0 } }, // Filtrer les pâtisseries avec un stock égal à 0
            { $group: { _id: null, ids: { $push: "$_id" } } } // Regrouper les IDs des pâtisseries
        ]);
        // Sélectionner aléatoirement un ID parmi ceux avec un stock supérieur à 0
        if (availablePastryIds.length > 0) {
            const randomIndex = Math.floor(Math.random() * availablePastryIds[0].ids.length);
            return availablePastryIds[0].ids[randomIndex];
        }
        else if (zeroStockPastryIds.length > 0) {
            const randomIndex = Math.floor(Math.random() * zeroStockPastryIds[0].ids.length);
            return zeroStockPastryIds[0].ids[randomIndex];
        }
        else {
            throw new Error("No pastries found.");
        }
    }
    catch (error) {
        throw new Error("Error selecting pastry ID: " + error.message);
    }
});
exports.selectPastryId = selectPastryId;
const incrementQuantityWon = (pastryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.Pastry.updateOne({ _id: pastryId }, { $inc: { quantityWon: 1 } });
        console.log("QuantityWon incremented successfully.");
    }
    catch (error) {
        console.error("Error incrementing quantityWon:", error.message);
    }
});
exports.incrementQuantityWon = incrementQuantityWon;
