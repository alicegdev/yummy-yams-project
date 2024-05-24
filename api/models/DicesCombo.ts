import { model, Model, Schema } from "mongoose";
import { IDicesCombo } from "../types/DicesCombo";

export const dicesComboSchema: Schema<IDicesCombo> = new Schema<IDicesCombo>({
    dices: { type: [Number] },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { collection: "dicesCombo" });

export const dicesCombo: Model<IDicesCombo> = model<IDicesCombo>("dicesCombo", dicesComboSchema);
