import { database } from '../database';

export class Pastry {
    private name: string;
    private image: string;
    private stock: number;
    private quantityWon: number;

    constructor(name = '', image = '', stock = 0, quantityWon = 0) {
        this.name = name;
        this.image = image;
        this.stock = stock;
        this.quantityWon = quantityWon;
    }

    async findAll(): Promise<Pastry[] | undefined> {
        try {
            return await database.pastriesCollection?.find().toArray();
        } catch (err) {
            console.error('Erreur lors de la recherche des pâtisseries :', err);
            return [];
        }
    }
}