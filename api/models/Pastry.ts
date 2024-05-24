import { model, Model, Schema } from "mongoose";
import { IPastry, } from "../types/Pastry"


// Removed useless code duplication and kept only model definition and methods interacting with database
export const pastrySchema: Schema<IPastry> = new Schema<IPastry>({
  name: { type: String },
  image: { type: String },
  stock: { type: Number },
  quantityWon: { type: Number }
}, { collection: "pastries" });

export const Pastry: Model<IPastry> = model<IPastry>("pastries", pastrySchema);

// Ajout de la méthode statique pour comptabiliser le stock total des pâtisseries
export const getTotalStock = async () => {
  const result = await Pastry.aggregate([
    {
      $group: {
        _id: null,
        totalStock: { $sum: "$stock" }
      }
    }
  ]);

  if (Array.isArray(result) && result.length > 0 && result[0].totalStock !== undefined) {
    return result[0].totalStock; // Retourner la valeur de 'totalStock'
  } else {
    return 0;
  }
};

// Ajout de la méthode statique pour comptabiliser le stock total des pâtisseries
export const getTotalWon = async () => {
  const result = await Pastry.aggregate([
    {
      $group: {
        _id: null,
        totalWon: { $sum: "$quantityWon" }
      }
    }
  ])

  if (Array.isArray(result) && result.length > 0 && result[0].totalWon !== undefined) {
    return result[0].totalWon;
  } else {
    return 0;
  }
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