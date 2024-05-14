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

export const Pastry: Model<IPastry> = model<IPastry>("Pastry", pastrySchema);

// Ajout de la méthode statique pour comptabiliser le stock total des pâtisseries
export const getTotalStock = () => {
  Pastry.aggregate([
    {
      $group: {
        _id: null,
        totalStock: { $sum: "$stock" }
      }
    }
  ])
};

// Ajout de la méthode statique pour comptabiliser le stock total des pâtisseries
export const getTotalWon = () => {
  Pastry.aggregate([
    {
      $group: {
        _id: null,
        totalWon: { $sum: "$quantityWon" }
      }
    }
  ])
};

export const selectPastryId = async (): Promise<string> => {
  try {
    // Récupérer tous les IDs des pâtisseries avec un stock supérieur à 0
    const availablePastryIds = await Pastry.aggregate([
      { $match: { stock: { $gt: 0 } } }, // Filtrer les pâtisseries avec un stock supérieur à 0
      { $group: { _id: null, ids: { $push: "$_id" } } } // Regrouper les IDs des pâtisseries
    ]);

    // Récupérer tous les IDs des pâtisseries avec un stock égal à 0
    const zeroStockPastryIds = await Pastry.aggregate([
      { $match: { stock: 0 } }, // Filtrer les pâtisseries avec un stock égal à 0
      { $group: { _id: null, ids: { $push: "$_id" } } } // Regrouper les IDs des pâtisseries
    ]);

    // Sélectionner aléatoirement un ID parmi ceux avec un stock supérieur à 0
    if (availablePastryIds.length > 0) {
      const randomIndex = Math.floor(Math.random() * availablePastryIds[0].ids.length);
      return availablePastryIds[0].ids[randomIndex];
    } else if (zeroStockPastryIds.length > 0) {
      const randomIndex = Math.floor(Math.random() * zeroStockPastryIds[0].ids.length);
      return zeroStockPastryIds[0].ids[randomIndex];
    } else {
      throw new Error("No pastries found.");
    }
  } catch (error: any) {
    throw new Error("Error selecting pastry ID: " + error.message);
  }
};

export const incrementQuantityWon = async (pastryId: string): Promise<void> => {
  try {
    await Pastry.updateOne({ _id: pastryId }, { $inc: { quantityWon: 1 } });
    console.log("QuantityWon incremented successfully.");
  } catch (error: any) {
    console.error("Error incrementing quantityWon:", error.message);
  }
};