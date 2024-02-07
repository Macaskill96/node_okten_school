"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const api_error_1 = require("../errors/api.error");
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    async getAll() {
        return await user_repository_1.userRepository.getAll();
    }
    async getById(id) {
        const user = await user_repository_1.userRepository.getById(id);
        if (!user) {
            throw new api_error_1.ApiError("user not found", 422);
        }
        return user;
    }
    async getMe(jwtPayload) {
        const user = await user_repository_1.userRepository.getById(jwtPayload.userId);
        if (!user) {
            throw new api_error_1.ApiError("You cant get this user", 403);
        }
        return user;
    }
    async updateMe(jwtPayload, body) {
        const user = await user_repository_1.userRepository.getById(jwtPayload.userId);
        if (!user) {
            throw new api_error_1.ApiError("User not found", 403);
        }
        return await user_repository_1.userRepository.updateById(jwtPayload.userId, body);
    }
    async deleteMe(jwtPayload) {
        const user = await user_repository_1.userRepository.getById(jwtPayload.userId);
        if (!user) {
            throw new api_error_1.ApiError("User not found", 403);
        }
        await user_repository_1.userRepository.deleteById(jwtPayload.userId);
    }
}
exports.userService = new UserService();
