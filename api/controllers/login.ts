import { User } from "../models/User"
import argon2 from "argon2";

export const loginUser = async (login: string, pwd: string) => {
    const user = await User.findOne({ login: login })
    const isMatch = user && await argon2.verify(user.pwd, pwd)
    return isMatch ? { user: user, message : 'User logged in' } : { user: null, message : 'Wrong credentials'}  ;
}
 
