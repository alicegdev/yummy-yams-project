import { Schema, model, Document, Model } from "mongoose";
import { Pastry, IPastry, pastrySchema, selectPastryId, incrementQuantityWon } from "./Pastry"

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

export const incrementPlayerAttempts = async (login: string): Promise<void> => {
    try {
        await User.findOneAndUpdate({ login: login }, { $inc: { player_attempts: 1 } });
        console.log("Player attempts incremented successfully.");
    } catch (error) {
        console.error("Error incrementing player attempts:", error);
    }
};

export const addPastryToUser = async (login: string): Promise<void> => {
    try {
        const randomPastryId = await selectPastryId();
        const pastry = await Pastry.findById(randomPastryId);

        if (!pastry) {
            throw new Error("Pastry not found.");
        }
        if (pastry.stock > 0) {
            await User.findOneAndUpdate({ login: login }, { $push: { player_pastries_won: pastry } });
            await incrementQuantityWon(randomPastryId);
            console.log("Pastry added to user successfully.");
        } else {
            console.log("Pastry is out of stock. Choosing another one.")
        }

    } catch (error) {
        console.error("Error adding pastry to user:", error);
    }
};

