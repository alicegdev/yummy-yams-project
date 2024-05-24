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
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const User_1 = require("./models/User");
const diceRoller_1 = require("./controllers/diceRoller");
const dotenv_1 = __importDefault(require("dotenv"));
const token_1 = require("./middlewares/token");
const argon2_1 = __importDefault(require("argon2"));
dotenv_1.default.config();
const port = 3001;
database_1.database.connect();
database_1.app.post("/", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, pwd } = req.body;
    try {
        const user = yield User_1.User.findOne({ login: login });
        const userLogin = { login: login };
        (0, token_1.createAccessToken)(user, res, pwd, userLogin);
    }
    catch (e) {
        res.status(500).json("An error occured." + e);
    }
}));
database_1.app.post("/signup", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
database_1.app.post("/signup", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (e) {
        res.status(500).json("An error occured." + e);
    }
}));
database_1.app.post("/diceRoll", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login } = req.body;
        const authHeader = req.headers['authorization'];
        if (login && (0, token_1.verifyToken)(authHeader, res)) {
            const { messageToUser, dices } = yield (0, diceRoller_1.rollerHandler)(login);
            res.status(200).json({ message: messageToUser, dices: dices });
        }
        else {
            return res.status(403).json("Couldn't authenticate");
        }
    }
    catch (e) {
        res.status(500).json("An error occured. " + e);
    }
}));
// Démarrage du serveur
database_1.app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
