import express from "express";
import { MongoClient } from 'mongodb';
import { Pastry } from "./models/Pastry"
import { database } from "./database";
import cors from "cors";
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
        const check = await User.findOne({ login: login, pwd: pwd })
        if (check) {
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

    const data = {
        login: login,
        pwd: pwd
    }

    try {
        const check = await User.findOne({ login: login })
        if (check) {
            res.json("User already exists.")
        } else {
            res.json("Email does not exist.")
            await User.create(data)
        }
    } catch (e) {
        res.json("Email does not exist")
    }
})


// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
