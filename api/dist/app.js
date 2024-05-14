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
const User_1 = require("./models/User");
const body_parser_1 = __importDefault(require("body-parser"));
// Configuration de l'application Express
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(body_parser_1.default.json());
const port = 3001;
database_1.database.connect();
exports.app.get("/", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.app.post("/", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, pwd } = req.body;
    try {
        const check = yield User_1.User.findOne({ login: login, pwd: pwd });
        if (check) {
            res.json("User logged in.");
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
    const data = {
        login: login,
        pwd: pwd
    };
    try {
        const check = yield User_1.User.findOne({ login: login });
        if (check) {
            res.json("User already exists.");
        }
        else {
            res.json("Email does not exist.");
            yield User_1.User.create(data);
        }
    }
    catch (e) {
        res.json("Email does not exist");
    }
}));
// Démarrage du serveur
exports.app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
