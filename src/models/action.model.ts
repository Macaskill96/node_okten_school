import { model, Schema, Types } from "mongoose";

import { User } from "./user.model";

const actionTokenSchema = new Schema({
  actionToken: {
    type: String,
    required: true,
  },
  tokenType: {
    type: String,
    required: true,
  },
  _userId: {
    type: Types.ObjectId,
    required: true,
    ref: User,
  },
});
export const ActionToken = model("actionToken", actionTokenSchema);
