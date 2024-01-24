import fs from "fs/promises";
import path from "path";

import { IUser } from "../types/user.type";

const dbToRead = path.resolve(process.cwd(), "db", "db.json");

let dbData: IUser[];

export async function readDbFile(): Promise<IUser[]> {
  try {
    const data = await fs.readFile(dbToRead, "utf8");
    dbData = JSON.parse(data);
    return dbData;
  } catch (err) {
    throw err;
  }
}

export async function writeToDb(data: IUser[]): Promise<IUser[]> {
  try {
    await fs.writeFile(dbToRead, JSON.stringify(data), "utf8");
    dbData = data;
    return dbData;
  } catch (err) {
    throw err;
  }
}
