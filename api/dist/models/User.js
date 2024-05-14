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
exports.addPastryToUser = exports.canUserPlayAgain = exports.incrementPlayerAttempts = exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const Pastry_1 = require("./Pastry");
exports.userSchema = new mongoose_1.Schema({
    login: { type: String, required: true },
    pwd: { type: String, required: true },
    player_attempts: { type: Number },
    player_pastries_won: { type: [Pastry_1.pastrySchema] }
}, { collection: "users" });
exports.User = (0, mongoose_1.model)("User", exports.userSchema);
const incrementPlayerAttempts = (login) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.User.findOneAndUpdate({ login: login }, { $inc: { player_attempts: 1 } });
        console.log("Player attempts incremented successfully.");
    }
    catch (error) {
        console.error("Error incrementing player attempts:", error);
    }
});
exports.incrementPlayerAttempts = incrementPlayerAttempts;
const canUserPlayAgain = (login) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield exports.User.findOne({ login: login });
        if (!user) {
            throw new Error("User not found.");
        }
        if (user.player_attempts < 3) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error("Error checking if user can play again:", error);
        return false;
    }
    ;
});
exports.canUserPlayAgain = canUserPlayAgain;
const addPastryToUser = (login) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const randomPastryId = yield (0, Pastry_1.selectPastryId)();
        const pastry = yield Pastry_1.Pastry.findById(randomPastryId);
        if (!pastry) {
            throw new Error("Pastry not found.");
        }
        if (pastry.stock > 0) {
            yield exports.User.findOneAndUpdate({ login: login }, { $push: { player_pastries_won: pastry } });
            yield (0, Pastry_1.incrementQuantityWon)(randomPastryId);
            console.log("Pastry added to user successfully.");
        }
        else {
            console.log("Pastry is out of stock. Choosing another one.");
        }
    }
    catch (error) {
        console.error("Error adding pastry to user:", error);
    }
});
exports.addPastryToUser = addPastryToUser;
