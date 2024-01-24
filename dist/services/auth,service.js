"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const user_repository_1 = require("../repositories/user.repository");
class AuthService {
    async signUp(body) {
        return await user_repository_1.userRepository.create(body);
    }
}
exports.authService = new AuthService();
