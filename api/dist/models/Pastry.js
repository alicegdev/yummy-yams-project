"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pastrySchema = new mongoose_1.Schema({
    name: { type: String },
    image: { type: String },
    stock: { type: Number },
    quantityWon: { type: Number }
}, { collection: "pastries" });
const Pastry = (0, mongoose_1.model)("Pastry", pastrySchema);
exports.default = Pastry;
