"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const user_model_1 = require("../models/user.model");
class UserRepository {
    async getAll() {
        return await user_model_1.User.find({});
    }
    async getById(id) {
        return await user_model_1.User.findOne(id);
    }
    async updateById(id, body) {
        return await user_model_1.User.findByIdAndUpdate(id, body, { returnDocument: "after" });
    }
    async deleteById(id) {
        return await user_model_1.User.deleteOne(id);
    }
    async create(body) {
        return await user_model_1.User.create(body);
    }
}
exports.userRepository = new UserRepository();
