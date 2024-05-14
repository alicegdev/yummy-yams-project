import { Schema, model, Document, Model } from "mongoose";
import { Pastry } from "./Pastry";

export interface IDicesCombo extends Document {
    dices: number[];
    user: Schema.Types.ObjectId;
}

export const dicesComboSchema: Schema<IDicesCombo> = new Schema<IDicesCombo>({
    dices: { type: [Number] },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { collection: "dicesCombo" });



export const dicesCombo: Model<IDicesCombo> = model<IDicesCombo>("DicesCombo", dicesComboSchema);
