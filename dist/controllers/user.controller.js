"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    async getAll(req, res, next) {
        try {
            const users = await user_service_1.userService.getAll();
            return res.json({ data: users });
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const id = req.params.id;
            const user = await user_service_1.userService.getById(id);
            res.json({ data: user });
        }
        catch (e) {
            next(e);
        }
    }
    async getMe(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            const user = await user_service_1.userService.getMe(jwtPayload);
            res.json({ data: user });
        }
        catch (e) {
            next(e);
        }
    }
    async deleteMe(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            await user_service_1.userService.deleteMe(jwtPayload);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async updateMe(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            const body = req.body;
            const user = await user_service_1.userService.updateMe(jwtPayload, body);
            res.status(201).json(user);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
