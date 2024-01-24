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
    async deleteById(id) {
        const user = await user_repository_1.userRepository.getById(id);
        if (!user) {
            throw new api_error_1.ApiError("User not found", 422);
        }
        await user_repository_1.userRepository.deleteById(id);
    }
    async updateById(id, body) {
        const user = await user_repository_1.userRepository.getAll();
        if (!user) {
            throw new api_error_1.ApiError("User not found", 422);
        }
        return await user_repository_1.userRepository.updateById(id, body);
    }
}
exports.userService = new UserService();
