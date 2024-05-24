import { IPastry } from "./Pastry";

export interface IUser extends Document {
    login: string;
    pwd: string;
    player_attempts: number;
    player_pastries_won: IPastry[];
}
