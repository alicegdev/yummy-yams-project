import { Schema, model, Document, Model } from "mongoose";

export interface IPastry extends Document {
  name: string;
  image: string;
  stock: number;
  quantityWon: number;
}

export const pastrySchema: Schema<IPastry> = new Schema<IPastry>({
  name: { type: String },
  image: { type: String },
  stock: { type: Number },
  quantityWon: { type: Number }
}, { collection: "pastries" });

// Ajout de la méthode statique pour comptabiliser le stock total des pâtisseries
pastrySchema.statics.getTotalStock = async function (): Promise<number> {
  try {
    const pastries = await this.find();
    // Calculer le stock total en additionnant le stock de chaque pâtisserie
    const totalStock = pastries.reduce((acc: number, pastry: IPastry) => acc + pastry.stock, 0);
    return totalStock;
  } catch (error: any) {
    throw new Error("Error calculating total stock: " + error.message);
  }
};

// Ajout de la méthode statique pour additionner toutes les quantités gagnées des pâtisseries
pastrySchema.statics.getTotalQuantityWon = async function (): Promise<number> {
  try {
    const pastries = await this.find();
    const totalQuantityWon = pastries.reduce((acc: number, pastry: IPastry) => acc + pastry.quantityWon, 0);
    return totalQuantityWon;
  } catch (error: any) {
    throw new Error("Error calculating total quantity won: " + error.message);
  }
};

const Pastry: Model<IPastry> = model<IPastry>("Pastry", pastrySchema);

export default Pastry;
