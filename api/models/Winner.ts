import { Schema, model, Document, Model } from "mongoose";
import { IPastry, pastrySchema } from "./Pastry"
import { IUser, userSchema } from "./User"

interface IWinner extends Document {
    user: IUser;
    user_pastries_won: IPastry[];
}

const winnerSchema: Schema<IWinner> = new Schema<IWinner>({
    user: { type: userSchema },
    user_pastries_won: { type: [pastrySchema] }
}, { collection: "users" });

const Winner: Model<IWinner> = model<IWinner>("Winner", winnerSchema);

