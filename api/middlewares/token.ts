import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { Response } from "express-serve-static-core";
import { Document, Types } from "mongoose";
import { IUser } from "../types/User";

export const createAccessToken = async (user: (Document<unknown, {}, IUser> & IUser & { _id: Types.ObjectId; }) | null, res: Response<any, Record<string, any>, number>, pwd: string | Buffer, userLogin: string | object | Buffer) => {
    const isMatch = user && await argon2.verify(user.pwd, pwd)
        if (isMatch) {
            process.env.ACCESS_TOKEN ? res.json({
                accessToken: jwt.sign(userLogin, process.env.ACCESS_TOKEN, {
                    expiresIn: '1h',
                })
            }) : res.json('Could not generate token')
        } else {
            res.json("Wrong details.")
        }
}

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