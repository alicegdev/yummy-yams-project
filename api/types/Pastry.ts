import { Document } from "mongoose";

export interface IPastry extends Document {
  name: string;
  image: string;
  stock: number;
  quantityWon: number;
}



