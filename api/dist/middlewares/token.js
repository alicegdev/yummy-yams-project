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
exports.verifyToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const argon2_1 = __importDefault(require("argon2"));
const createAccessToken = (user, res, pwd, userLogin) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.createAccessToken = createAccessToken;
const verifyToken = (authHeader, res) => {
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        process.env.ACCESS_TOKEN_SECRET && jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userLogin) => {
            return false;
        });
    }
    else {
        return true;
    }
};
exports.verifyToken = verifyToken;
