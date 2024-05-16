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

export const rollerHandler = async (login: string): Promise<any> => {
    let messageToUser = '';
    const dices = generateRandomDices();

    if ((getTotalStock() > getTotalWon()) && await canUserPlayAgain(login)) {
        incrementPlayerAttempts(login);

        if (isYams(dices)) {
            const count = 3;
            for (let i = 0; i < count; i++) {
                await addPastryToUser(login);
            }
            messageToUser += "Yams ! Vous avez gagné 3 pâtisseries. ";
        } else if (isDouble(dices)) {
            const count = 2;
            for (let i = 0; i < count; i++) {
                await addPastryToUser(login);
            }
            messageToUser += "Double ! Vous avez gagné 2 pâtisseries. ";
        } else if (isSquare(dices)) {
            const count = 1;
            for (let i = 0; i < count; i++) {
                await addPastryToUser(login);
            }
            messageToUser += "Carré ! Vous avez gagné 1 pâtisserie. ";
        } else {
            messageToUser = "Perdu ! Vous n'avez pas gagné de pâtisseries.";
        }
    } else {
        messageToUser = "Vous avez atteint le nombre maximum d'essais et/ou il n'y a plus de pâtisseries à gagner.";
    }

    return { messageToUser, dices };
};