import { Types } from "mongoose";

import { EActionTokenType } from "../enums/token.type.enum";
import { ITokenPair } from "../services/token.service";

export interface IToken extends ITokenPair {
  _userId: Types.ObjectId;
}

export interface IActionToken {
  actionToken: string;
  tokenType: EActionTokenType;
  _userId: Types.ObjectId;
}
