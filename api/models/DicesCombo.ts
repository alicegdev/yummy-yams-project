import { Schema, model, Document, Model } from "mongoose";

export interface IDicesCombo extends Document {
    dices: number[];
    user: Schema.Types.ObjectId;
}

export const dicesComboSchema: Schema<IDicesCombo> = new Schema<IDicesCombo>({
    dices: { type: [Number] },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { collection: "dicesCombo" });

// Méthodes personnalisées pour évaluer les combinaisons de dés
dicesComboSchema.methods.isYams = function (): boolean {
    return this.dices.every(dice => dice === this.dices[0]);
};

dicesComboSchema.methods.isSquare = function (): boolean {
    const uniqueValues = new Set(this.dices);
    return uniqueValues.size === 2;
};

dicesComboSchema.methods.isDouble = function (): boolean {
    const uniqueValues = new Set(this.dices);
    return uniqueValues.size === 5;
};

export const dicesCombo: Model<IDicesCombo> = model<IDicesCombo>("DicesCombo", dicesComboSchema);
