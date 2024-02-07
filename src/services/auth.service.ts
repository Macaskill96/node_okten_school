import { Types } from "mongoose";

import { EEmailAction } from "../enums/email-action.enum";
import { ERole } from "../enums/role.enum";
import { EActionTokenType } from "../enums/token.type.enum";
import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { ILogin } from "../types/auth.type";
import { IUser } from "../types/user.type";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { ITokenPair, ITokenPayload, tokenService } from "./token.service";

class AuthService {
  public async singUpAdmin(dto: Partial<IUser>): Promise<IUser> {
    const userFromDB = await userRepository.getOneByParams({
      email: dto.email,
    });
    if (userFromDB) {
      throw new ApiError("User with provided email already exists", 401);
    }

    const hashedPassword = await passwordService.hash(dto.password);
    return await userRepository.create({
      ...dto,
      password: hashedPassword,
      role: ERole.ADMIN,
    });
  }
  public async signInAdmin(dto: ILogin): Promise<ITokenPair> {
    const user = await userRepository.getOneByParams({
      email: dto.email,
      role: ERole.ADMIN,
    });
    if (!user) {
      throw new ApiError("Not valid email or password", 401);
    }

    const isMatch = await passwordService.compare(dto.password, user.password);
    if (!isMatch) {
      throw new ApiError("Not valid email or password", 401);
    }

    const jwtTokens = tokenService.generateTokenPair(
      { userId: user._id, role: ERole.ADMIN },
      ERole.ADMIN,
    );
    await tokenRepository.create({ ...jwtTokens, _userId: user._id });

    return jwtTokens;
  }
  public async signUp(dto: Partial<IUser>): Promise<unknown> {
    const user = await userRepository.getOneByParams({ email: dto.email });
    if (user) {
      throw new ApiError("User with provided email already exists", 400);
    }
    await emailService.sendMail(dto.email, EEmailAction.WELCOME, {
      name: dto.name,
    });
    const hashedPassword = await passwordService.hash(dto.password);
    return await userRepository.create({ ...dto, password: hashedPassword });
  }
  public async signIn(dto: ILogin): Promise<ITokenPair> {
    const user = await userRepository.getOneByParams({ email: dto.email });
    if (!user) {
      throw new ApiError("not valid email or password", 401);
    }
    const isMatch = await passwordService.compare(dto.password, user.password);
    if (!isMatch) {
      throw new ApiError("not valid email or password", 401);
    }
    const jwtTokens = tokenService.generateTokenPair(
      { userId: user._id, role: ERole.USER },
      ERole.USER,
    );
    await tokenRepository.create({ ...jwtTokens, _userId: user._id });

    return jwtTokens;
  }
  public async refresh(
    jwtPayload: ITokenPayload,
    refreshToken: string,
  ): Promise<ITokenPair> {
    const user = await userRepository.getById(jwtPayload.userId);
    await tokenRepository.deleteOneByParams({ refreshToken });

    const jwtTokens = tokenService.generateTokenPair(
      {
        userId: jwtPayload.userId,
        role: user.role,
      },
      user.role,
    );
    await tokenRepository.create({
      ...jwtTokens,
      _userId: new Types.ObjectId(jwtPayload.userId),
    });

    return jwtTokens;
  }
  public async forgotPassword(user: IUser) {
    const actionToken = tokenService.createActionToken(
      { userId: user._id, role: ERole.USER },
      EActionTokenType.FORGOT,
    );
    await Promise.all([
      tokenRepository.createActionToken({
        actionToken,
        _userId: user._id,
        tokenType: EActionTokenType.FORGOT,
      }),
      emailService.sendMail(user.email, EEmailAction.FORGOT_PASSWORD, {
        actionToken,
      }),
    ]);
  }
  public async setForgotPassword(password: string, actionToken: string) {
    const payload = tokenService.checkActionToken(
      actionToken,
      EActionTokenType.FORGOT,
    );
    const entity = await tokenRepository.findActionTokenByParams({
      actionToken,
    });
    if (!entity) {
      throw new ApiError("not valid token", 400);
    }

    const newHashedPassword = await passwordService.hash(password);
    await userRepository.updateById(payload.userId, {
      password: newHashedPassword,
    });
  }
}
export const authService = new AuthService();
