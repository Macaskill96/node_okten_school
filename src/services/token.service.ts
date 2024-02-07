import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ERole } from "../enums/role.enum";
import { EActionTokenType, ETokenType } from "../enums/token.type.enum";
import { ApiError } from "../errors/api.error";

export interface ITokenPayload {
  userId: string;
  role: ERole;
}
export interface ITokenPair {
  accessToken: string;
  accessExpiresIn: string;
  refreshToken: string;
  refreshExpiresIn: string;
}

const jwtAccessSecret = "jwtAccess";
const jwtRefreshSecret = "jwtRefresh";
class TokenService {
  public generateTokenPair(payload: ITokenPayload, role: ERole): ITokenPair {
    let accessTokenSecret: string;
    let accessExpiresIn: string;
    let refreshTokenSecret: string;
    let refreshExpiresIn: string;

    switch (role) {
      case ERole.USER:
        accessTokenSecret = jwtAccessSecret;
        accessExpiresIn = "4h";
        refreshTokenSecret = jwtRefreshSecret;
        refreshExpiresIn = "30d";
        break;
      case ERole.ADMIN:
        accessTokenSecret = jwtAccessSecret;
        accessExpiresIn = "5h";
        refreshTokenSecret = jwtRefreshSecret;
        refreshExpiresIn = "31d";
        break;
    }

    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: accessExpiresIn,
    });

    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: refreshExpiresIn,
    });

    return {
      accessToken,
      accessExpiresIn,
      refreshToken,
      refreshExpiresIn,
    };
  }
  public checkToken(
    token: string,
    type: ETokenType,
    role: ERole,
  ): ITokenPayload {
    switch (role) {
      case ERole.ADMIN:
        return this.checkTokenAdmin(token, type);
      case ERole.USER:
        return this.checkTokenUser(token, type);
    }
  }

  public checkActionToken(actionToken: string, type: EActionTokenType) {
    try {
      let secret: string;
      switch (type) {
        case EActionTokenType.FORGOT:
          secret = jwtAccessSecret;
          break;
      }
      return jwt.verify(actionToken, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 402);
    }
  }
  public createActionToken(
    payload: ITokenPayload,
    tokenType: EActionTokenType,
  ) {
    let secret: string;
    switch (tokenType) {
      case EActionTokenType.FORGOT:
        secret = jwtAccessSecret;
    }
    return jwt.sign(payload, secret, {
      expiresIn: configs.JWT_TOKEN_EXPIRES_IN,
    });
  }
  private checkTokenUser(token: string, type: ETokenType): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case ETokenType.ACCESS:
          secret = jwtAccessSecret;
          break;
        case ETokenType.REFRESH:
          secret = jwtRefreshSecret;
          break;
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  private checkTokenAdmin(token: string, type: ETokenType): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case ETokenType.ACCESS:
          secret = jwtAccessSecret;
          break;
        case ETokenType.REFRESH:
          secret = jwtRefreshSecret;
          break;
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
