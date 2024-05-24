import { Schema, model, Document, Model } from "mongoose";

interface IPastry extends Document {
  name: string;
  image: string;
  stock: number;
  quantityWon: number;
}

const pastrySchema: Schema<IPastry> = new Schema<IPastry>({
  name: { type: String },
  image: { type: String },
  stock: { type: Number },
  quantityWon: { type: Number }
}, { collection: "pastries" });

const Pastry: Model<IPastry> = model<IPastry>("Pastry", pastrySchema);

export default Pastry;

