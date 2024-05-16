import express from "express";
import { database } from "./database";
import cors from "cors";
import argon2 from "argon2";
import { User } from "./models/User";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { rollerHandler } from "./utils/diceRoller"
import dotenv from "dotenv"

dotenv.config()

export interface Token {
    login: string;
}

// Configuration de l'application Express
export const app = express();
app.use(cors())
app.use(bodyParser.json());

const port = 3001;

database.connect();


app.post("/", cors(), async (req, res) => {
    const { login, pwd } = req.body;
    try {
        const user = await User.findOne({ login: login })
        const userLogin = { login: login }
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
    } catch (e) {
        res.status(500).json("An error occured." + e)
    }
})

app.get("/signup", cors(), async (req, res) => {
})

app.post("/signup", cors(), async (req, res) => {
    const { login, pwd } = req.body;
    const hashedPassword: string = await argon2.hash(pwd);
    const data = {
        login: login,
        pwd: hashedPassword,
        player_attempts: 0
    }

    try {
        const check = await User.findOne({ login: login })
        if (check) {
            res.json("User already exists.")
        } else {
            await User.create(data)
            res.json("User created")
        }
    } catch (e) {
        res.status(500).json("An error occured." + e)
    }
})

app.post("/signup", cors(), async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json("An error occured." + e)
    }
})

app.post("/diceRoll", cors(), async (req, res) => {
    try {
        const { login } = req.body;
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token) {
            process.env.ACCESS_TOKEN_SECRET && jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, userLogin: any) => {
                if (err) return res.sendStatus(403)
            })
        }
        console.log(login);
        if (login) {
            const { messageToUser, dices } = await rollerHandler(login);
            console.log(messageToUser);
            console.log(dices);
            res.status(200).json({ message: messageToUser, dices: dices });
        } else {
            throw new Error("Couldn't get valid login.")
        }
    } catch (e) {
        res.status(500).json("An error occured." + e)
    }
})

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});


