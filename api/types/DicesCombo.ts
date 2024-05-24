import { Schema } from "mongoose";

export interface IDicesCombo extends Document {
    dices: number[];
    user: Schema.Types.ObjectId;
}


