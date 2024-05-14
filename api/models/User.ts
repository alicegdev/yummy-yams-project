import { Schema, model, Document, Model } from "mongoose";
import { IPastry, pastrySchema } from "./Pastry"

export interface IUser extends Document {
    login: string;
    pwd: string;
    player_attempts: number;
    player_pastries_won: IPastry[];
}

export const userSchema: Schema<IUser> = new Schema<IUser>({
    login: { type: String },
    pwd: { type: String },
    player_attempts: { type: Number },
    player_pastries_won: { type: [pastrySchema] }
}, { collection: "users" });

export const User: Model<IUser> = model<IUser>("User", userSchema);
