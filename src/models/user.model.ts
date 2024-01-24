import { model, Schema } from "mongoose";

import { IUser } from "../types/user.type";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export const User = model<IUser>("User");
