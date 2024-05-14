import express from "express";
import { MongoClient } from 'mongodb';
import { Pastry } from "./models/Pastry"
import { database } from "./database";
import cors from "cors";
import { User } from "./models/User";

// Configuration de l'application Express
export const app = express();
const port = 3000;

app.get("/", cors(), (req, res) => {

})

app.post("/", cors(), async (req, res) => {
    const { login, pwd } = req.body;
    try {
        const check = await User.findOne({ login: login })
        if (check) {
            res.json("Email exists.")
        } else {
            res.json("Email does not exist.")
        }
    } catch (e) {
        res.json("Email does not exist.")
    }
})

app.get("/signup", cors(), (req, res) => {

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
            res.json("User exists.")
        } else {
            res.json("Email does not exist.")
            await User.insertMany([data])
        }
    } catch (e) {
        res.json("Email does not exist")
    }
})


// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
