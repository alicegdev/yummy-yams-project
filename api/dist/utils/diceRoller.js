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
exports.rollerHandler = void 0;
const User_1 = require("../models/User");
const isYams = function (dices) {
    return dices.every(dice => dice === dices[0]);
};
const isSquare = function (dices) {
    const uniqueValues = new Set(dices);
    return uniqueValues.size === 2;
};
const isDouble = function (dices) {
    const uniqueValues = new Set(dices);
    return uniqueValues.size === 5;
};
// Méthode pour générer un tableau de 5 dés avec des valeurs aléatoires
const generateRandomDices = function () {
    // la condition : que le total des pâtisseries gagnées soit inférieur au total en stock
    const dices = [];
    for (let i = 0; i < 5; i++) {
        // Générer une valeur aléatoire entre 1 et 6 pour chaque dé
        const randomValue = Math.floor(Math.random() * 6) + 1;
        dices.push(randomValue);
    }
    return dices;
};
const rollerHandler = (login) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Coucou je suis dans la fonction');
    let messageToUser = '';
    const dices = generateRandomDices();
    // if ((getTotalStock() > getTotalWon()) && await canUserPlayAgain(login)) {
    (0, User_1.incrementPlayerAttempts)(login);
    if (isYams(dices)) {
        const count = 3;
        for (let i = 0; i < count; i++) {
            yield (0, User_1.addPastryToUser)(login);
        }
        messageToUser += "Yams ! Vous avez gagné 3 pâtisseries. ";
    }
    else if (isDouble(dices)) {
        const count = 2;
        for (let i = 0; i < count; i++) {
            yield (0, User_1.addPastryToUser)(login);
        }
        messageToUser += "Double ! Vous avez gagné 2 pâtisseries. ";
    }
    else if (isSquare(dices)) {
        const count = 1;
        for (let i = 0; i < count; i++) {
            yield (0, User_1.addPastryToUser)(login);
        }
        messageToUser += "Carré ! Vous avez gagné 1 pâtisserie. ";
    }
    else {
        messageToUser = "Perdu ! Vous n'avez pas gagné de pâtisseries.";
    }
    // } else {
    //     messageToUser = "Vous avez atteint le nombre maximum d'essais et/ou il n'y a plus de pâtisseries à gagner.";
    // }
    return { messageToUser, dices };
});
exports.rollerHandler = rollerHandler;
