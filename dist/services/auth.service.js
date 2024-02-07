"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const mongoose_1 = require("mongoose");
const email_action_enum_1 = require("../enums/email-action.enum");
const role_enum_1 = require("../enums/role.enum");
const token_type_enum_1 = require("../enums/token.type.enum");
const api_error_1 = require("../errors/api.error");
const token_repository_1 = require("../repositories/token.repository");
const user_repository_1 = require("../repositories/user.repository");
const email_service_1 = require("./email.service");
const password_service_1 = require("./password.service");
const token_service_1 = require("./token.service");
class AuthService {
    async singUpAdmin(dto) {
        const userFromDB = await user_repository_1.userRepository.getOneByParams({
            email: dto.email,
        });
        if (userFromDB) {
            throw new api_error_1.ApiError("User with provided email already exists", 401);
        }
        const hashedPassword = await password_service_1.passwordService.hash(dto.password);
        return await user_repository_1.userRepository.create({
            ...dto,
            password: hashedPassword,
            role: role_enum_1.ERole.ADMIN,
        });
    }
    async signInAdmin(dto) {
        const user = await user_repository_1.userRepository.getOneByParams({
            email: dto.email,
            role: role_enum_1.ERole.ADMIN,
        });
        if (!user) {
            throw new api_error_1.ApiError("Not valid email or password", 401);
        }
        const isMatch = await password_service_1.passwordService.compare(dto.password, user.password);
        if (!isMatch) {
            throw new api_error_1.ApiError("Not valid email or password", 401);
        }
        const jwtTokens = token_service_1.tokenService.generateTokenPair({ userId: user._id, role: role_enum_1.ERole.ADMIN }, role_enum_1.ERole.ADMIN);
        await token_repository_1.tokenRepository.create({ ...jwtTokens, _userId: user._id });
        return jwtTokens;
    }
    async signUp(dto) {
        const user = await user_repository_1.userRepository.getOneByParams({ email: dto.email });
        if (user) {
            throw new api_error_1.ApiError("User with provided email already exists", 400);
        }
        await email_service_1.emailService.sendMail(dto.email, email_action_enum_1.EEmailAction.WELCOME, {
            name: dto.name,
        });
        const hashedPassword = await password_service_1.passwordService.hash(dto.password);
        return await user_repository_1.userRepository.create({ ...dto, password: hashedPassword });
    }
    async signIn(dto) {
        const user = await user_repository_1.userRepository.getOneByParams({ email: dto.email });
        if (!user) {
            throw new api_error_1.ApiError("not valid email or password", 401);
        }
        const isMatch = await password_service_1.passwordService.compare(dto.password, user.password);
        if (!isMatch) {
            throw new api_error_1.ApiError("not valid email or password", 401);
        }
        const jwtTokens = token_service_1.tokenService.generateTokenPair({ userId: user._id, role: role_enum_1.ERole.USER }, role_enum_1.ERole.USER);
        await token_repository_1.tokenRepository.create({ ...jwtTokens, _userId: user._id });
        return jwtTokens;
    }
    async refresh(jwtPayload, refreshToken) {
        const user = await user_repository_1.userRepository.getById(jwtPayload.userId);
        await token_repository_1.tokenRepository.deleteOneByParams({ refreshToken });
        const jwtTokens = token_service_1.tokenService.generateTokenPair({
            userId: jwtPayload.userId,
            role: user.role,
        }, user.role);
        await token_repository_1.tokenRepository.create({
            ...jwtTokens,
            _userId: new mongoose_1.Types.ObjectId(jwtPayload.userId),
        });
        return jwtTokens;
    }
    async forgotPassword(user) {
        const actionToken = token_service_1.tokenService.createActionToken({ userId: user._id, role: role_enum_1.ERole.USER }, token_type_enum_1.EActionTokenType.FORGOT);
        await Promise.all([
            token_repository_1.tokenRepository.createActionToken({
                actionToken,
                _userId: user._id,
                tokenType: token_type_enum_1.EActionTokenType.FORGOT,
            }),
            email_service_1.emailService.sendMail(user.email, email_action_enum_1.EEmailAction.FORGOT_PASSWORD, {
                actionToken,
            }),
        ]);
    }
    async setForgotPassword(password, actionToken) {
        const payload = token_service_1.tokenService.checkActionToken(actionToken, token_type_enum_1.EActionTokenType.FORGOT);
        const entity = await token_repository_1.tokenRepository.findActionTokenByParams({
            actionToken,
        });
        if (!entity) {
            throw new api_error_1.ApiError("not valid token", 400);
        }
        const newHashedPassword = await password_service_1.passwordService.hash(password);
        await user_repository_1.userRepository.updateById(payload.userId, {
            password: newHashedPassword,
        });
    }
}
exports.authService = new AuthService();
