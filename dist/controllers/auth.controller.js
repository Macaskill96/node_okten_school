"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    async signUpAdmin(req, res, next) {
        try {
            const body = req.body;
            const createdUser = await auth_service_1.authService.singUpAdmin(body);
            return res.json({ data: createdUser });
        }
        catch (e) {
            next(e);
        }
    }
    async signInAdmin(req, res, next) {
        try {
            const body = req.body;
            const jwtTokens = await auth_service_1.authService.signInAdmin(body);
            return res.json({ data: jwtTokens });
        }
        catch (e) {
            next(e);
        }
    }
    async signUp(req, res, next) {
        try {
            const body = req.body;
            const user = await auth_service_1.authService.signUp(body);
            return res.json({ data: user });
        }
        catch (e) {
            next(e);
        }
    }
    async signIn(req, res, next) {
        try {
            const body = req.body;
            const jwtToken = await auth_service_1.authService.signIn(body);
            return res.json({ data: jwtToken });
        }
        catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            const refreshToken = req.res.locals.refreshToken;
            const jwtTokens = await auth_service_1.authService.refresh(jwtPayload, refreshToken);
            return res.json({ data: jwtTokens });
        }
        catch (e) {
            next(e);
        }
    }
    async forgotPassword(req, res, next) {
        try {
            const user = req.res.locals;
            await auth_service_1.authService.forgotPassword(user);
        }
        catch (e) {
            next(e);
        }
    }
    async setForgotPassword(req, res, next) {
        const token = req.params.token;
        const newPassword = req.body.newPassword;
        await auth_service_1.authService.setForgotPassword(newPassword, token);
    }
}
exports.authController = new AuthController();
