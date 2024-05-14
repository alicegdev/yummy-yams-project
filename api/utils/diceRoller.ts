import { getTotalStock, getTotalWon } from "../models/Pastry";
import { addPastryToUser, canUserPlayAgain, incrementPlayerAttempts } from "../models/User";

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
export const rollerHandler = async (login: string): Promise<any> => {
    let messageToUser = '';
    if ((getTotalStock() > getTotalWon()) && await canUserPlayAgain(login)) {
        const dices = generateRandomDices();
        incrementPlayerAttempts(login);
        const conditions = [
            { condition: isYams(dices), count: 3, message: "Yams ! Vous avez gagné 3 pâtisseries." },
            { condition: isDouble(dices), count: 2, message: "Double ! Vous avez gagné 2 pâtisseries." },
            { condition: isSquare(dices), count: 1, message: "Carré ! Vous avez gagné 1 pâtisserie." }
        ];

        conditions.forEach(({ condition, count, message }) => {
            if (condition) {
                for (let i = 0; i < count; i++) {
                    addPastryToUser(login);
                }
                messageToUser = message;
            } else {
                messageToUser = "Perdu ! Vous n'avez pas gagné de pâtisseries."
            }
        });
    } else {
        messageToUser = "Vous avez atteint le nombre maximum d'essais ou il n'y a plus de pâtisseries à gagner."
    }
    return messageToUser;
};