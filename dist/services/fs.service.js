"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeToDb = exports.readDbFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const dbToRead = path_1.default.resolve(process.cwd(), "db", "db.json");
let dbData;
async function readDbFile() {
    try {
        const data = await promises_1.default.readFile(dbToRead, "utf8");
        dbData = JSON.parse(data);
        return dbData;
    }
    catch (err) {
        throw err;
    }
}
exports.readDbFile = readDbFile;
async function writeToDb(data) {
    try {
        await promises_1.default.writeFile(dbToRead, JSON.stringify(data), "utf8");
        dbData = data;
        return dbData;
    }
    catch (err) {
        throw err;
    }
}
exports.writeToDb = writeToDb;
