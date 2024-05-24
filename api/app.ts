import cors from "cors";
import { app, database } from "./database";
import { User } from "./models/User";
import { rollerHandler } from "./controllers/diceRoller"
import { createAccessToken, verifyToken } from "./middlewares/token"
import argon2 from "argon2";
import { loginUser } from "./controllers/login"

export interface Token {
    login: string;
}

const port = 3001;

database.connect();

// Mettre les routes dans des fichiers séparés

app.post("/", cors(), async (req, res) => {
    const { login, pwd } = req.body;
    try {
        const { user, message } = await loginUser(login, pwd);
        if (user != null) {
            const accessToken = createAccessToken(user);
            res.status(200).json(accessToken);
        } else {
            res.status(403).json(message)
        }
    } catch (e) {
        res.status(500).json("An error occured." + e)
    }
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

        if (login && verifyToken(authHeader, res)) {
            const { messageToUser, dices } = await rollerHandler(login);
            res.status(200).json({ message: messageToUser, dices: dices });
        } else {
            return res.status(403).json("Couldn't authenticate")
        }

    } catch (e) {
        res.status(500).json("An error occured. " + e)
    }
})

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});


