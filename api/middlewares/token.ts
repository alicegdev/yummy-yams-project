import jwt from 'jsonwebtoken';
import { Types, Document } from 'mongoose';
import { IUser } from '../types/User'; // Assurez-vous de fournir le bon chemin pour l'import

type AccessTokenResult = {
    accessToken?: string;
    message: string;
};

export const createAccessToken = async (
    user: Document<unknown, {}, IUser> & IUser & { _id: Types.ObjectId }
): Promise<AccessTokenResult> => {
    const envToken: string | undefined = process.env.ACCESS_TOKEN;

    if (!envToken) {
        return { message: 'Could not generate token' };
    }

    try {
        const accessToken = jwt.sign(user.login, envToken, { expiresIn: '1h' });
        return { accessToken, message: 'OK' };
    } catch (e) {
        return { message: `An error occurred: ${e}` };
    }
};


export const verifyToken = (authHeader: string | undefined, res: { sendStatus: (arg0: number) => void; }) => {
    const token = authHeader && authHeader.split(' ')[1]
    if (token) {
        process.env.ACCESS_TOKEN_SECRET && jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, userLogin: any) => {
            return false;
        })
    } else {
        return true;
    }
    
}