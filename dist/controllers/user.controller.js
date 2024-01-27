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
        const id = req.params.id;
        try {
            const user = await user_service_1.userService.getById(id);
            res.json({ data: user });
        }
        catch (e) {
            next(e);
        }
    }
    async deleteById(req, res, next) {
        const { id } = req.params;
        try {
            await user_service_1.userService.deleteById(id);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async updateById(req, res, next) {
        const { id } = req.params;
        const body = req.body;
        try {
            const user = await user_service_1.userService.updateById(id, body);
            res.json(user);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
