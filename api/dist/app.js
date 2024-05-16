"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const cors_1 = __importDefault(require("cors"));
const argon2_1 = __importDefault(require("argon2"));
const User_1 = require("./models/User");
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const diceRoller_1 = require("./utils/diceRoller");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configuration de l'application Express
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(body_parser_1.default.json());
const port = 3001;
database_1.database.connect();
exports.app.post("/", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, pwd } = req.body;
    try {
        const user = yield User_1.User.findOne({ login: login });
        const userLogin = { login: login };
        const isMatch = user && (yield argon2_1.default.verify(user.pwd, pwd));
        if (isMatch) {
            process.env.ACCESS_TOKEN ? res.json({
                accessToken: jsonwebtoken_1.default.sign(userLogin, process.env.ACCESS_TOKEN, {
                    expiresIn: '1h',
                })
            }) : res.json('Could not generate token');
        }
        else {
            res.json("Wrong details.");
        }
    }
    catch (e) {
        res.status(500).json("An error occured." + e);
    }
}));
exports.app.get("/signup", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.app.post("/signup", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, pwd } = req.body;
    const hashedPassword = yield argon2_1.default.hash(pwd);
    const data = {
        login: login,
        pwd: hashedPassword,
        player_attempts: 0
    };
    try {
        const check = yield User_1.User.findOne({ login: login });
        if (check) {
            res.json("User already exists.");
        }
        else {
            yield User_1.User.create(data);
            res.json("User created");
        }
    }
    catch (e) {
        res.status(500).json("An error occured." + e);
    }
}));
exports.app.post("/signup", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (e) {
        res.status(500).json("An error occured." + e);
    }
}));
exports.app.post("/diceRoll", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token) {
            process.env.ACCESS_TOKEN_SECRET && jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userLogin) => {
                if (err)
                    return res.sendStatus(403);
            });
        }
        console.log(login);
        if (login) {
            const { messageToUser, dices } = yield (0, diceRoller_1.rollerHandler)(login);
            console.log(messageToUser);
            console.log(dices);
            res.status(200).json({ message: messageToUser, dices: dices });
        }
        else {
            throw new Error("Couldn't get valid login.");
        }
    }
    catch (e) {
        res.status(500).json("An error occured." + e);
    }
}));
// Démarrage du serveur
exports.app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
