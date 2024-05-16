import express from "express";
import { database } from "./database";
import cors from "cors";
import argon2 from "argon2";
import { User } from "./models/User";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import SECRET from "./jwtToken";
import { rollerHandler } from "./utils/diceRoller"

export interface Token {
    login: string;
}

// Configuration de l'application Express
export const app = express();
app.use(cors())
app.use(bodyParser.json());

const port = 3001;

database.connect();
// Méthode pour générer un tableau de 5 dés avec des valeurs aléatoires
const isAuth = async (req: any): Promise<boolean> => {
    const token: string = req.headers['x-access-token'] as string;
    const decoded = jwt.verify(token, SECRET) as Token;
    const login: string = decoded.login;
    const user = await User.findOne({ login: login });
    return user ? true : false;
}

// Méthode pour générer un tableau de 5 dés avec des valeurs aléatoires
const getLogin = async (req: any): Promise<string | undefined> => {
    try {
        if (await isAuth(req) === true) {
            const token: string = req.headers['x-access-token'] as string;
            const decoded = jwt.verify(token, SECRET) as Token;
            const login: string = decoded.login;
            return login
        }
    } catch {
        throw new Error("Couldn't get valid token.");
    }

}

app.post("/", cors(), async (req, res) => {
    const { login, pwd } = req.body;
    try {
        const user = await User.findOne({ login: login })
        const isMatch = user && await argon2.verify(user.pwd, pwd)
        if (isMatch) {
            res.json("User logged in.")
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
        pwd: hashedPassword
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
        const login = await getLogin(req);
        if (login) {
            const { message, dices } = await rollerHandler(login);
            return { message, dices };
        } else {
            throw new Error("Couldn't get valid token.")
        }
    } catch (e) {
        res.status(500).json("An error occured." + e)
    }
})

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});


