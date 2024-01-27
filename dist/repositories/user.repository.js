"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const api_error_1 = require("../errors/api.error");
const user_model_1 = require("../models/user.model");
class UserRepository {
    async getAll() {
        return await user_model_1.User.find({});
    }
    async getById(id) {
        const user = user_model_1.User.findOne({ _id: id });
        if (!user) {
            throw new api_error_1.ApiError("user not found", 422);
        }
        return user;
    }
    async updateById(id, body) {
        return await user_model_1.User.findByIdAndUpdate(id, body, { returnDocument: "after" });
    }
    async deleteById(id) {
        await user_model_1.User.deleteOne({ _id: id });
    }
    async create(body) {
        return await user_model_1.User.create(body);
    }
}
exports.userRepository = new UserRepository();
