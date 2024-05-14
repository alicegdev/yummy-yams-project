import { getTotalStock, getTotalWon } from "../models/Pastry";
import { addPastryToUser, incrementPlayerAttempts } from "../models/User";

const isYams = function (dices: number[]): boolean {
    return dices.every(dice => dice === dices[0]);
};

const isSquare = function (dices: number[]): boolean {
    const uniqueValues = new Set(dices);
    return uniqueValues.size === 2;
};

const isDouble = function (dices: number[]): boolean {
    const uniqueValues = new Set(dices);
    return uniqueValues.size === 5;
};

// Méthode pour générer un tableau de 5 dés avec des valeurs aléatoires
const generateRandomDices = function (): number[] {
    // la condition : que le total des pâtisseries gagnées soit inférieur au total en stock
    const dices: number[] = [];
    for (let i = 0; i < 5; i++) {
        // Générer une valeur aléatoire entre 1 et 6 pour chaque dé
        const randomValue = Math.floor(Math.random() * 6) + 1;
        dices.push(randomValue);
    }
    return dices;
};

// Créer un nouvel objet DiceCombo
export const rollerHandler = function (login: string): any {
    // la condition : que le total des pâtisseries gagnées soit inférieur au total en stock
    if (getTotalStock() > getTotalWon()) {
        const dices = generateRandomDices();
        incrementPlayerAttempts(login);
        const conditions = [
            { condition: isYams(dices), count: 3 },
            { condition: isDouble(dices), count: 2 },
            { condition: isSquare(dices), count: 1 }
        ];

        conditions.forEach(({ condition, count }) => {
            if (condition) {
                for (let i = 0; i < count; i++) {
                    addPastryToUser(login);
                }
            }
        });
    }
};