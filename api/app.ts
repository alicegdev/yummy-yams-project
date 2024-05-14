import express from "express";
import { database } from "./database";
import cors from "cors";
import argon2 from "argon2";
import { User } from "./models/User";
import bodyParser from "body-parser";

// Configuration de l'application Express
export const app = express();
app.use(cors())
app.use(bodyParser.json());

const port = 3001;

database.connect();

app.get("/", cors(), async (req, res) => {
})

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
        pwd: pwd
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


// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
