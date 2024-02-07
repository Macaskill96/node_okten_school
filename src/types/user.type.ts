import { Document } from "mongoose";

import { ERole } from "../enums/role.enum";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: ERole;
}
