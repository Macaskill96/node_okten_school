"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRepository = void 0;
const action_model_1 = require("../models/action.model");
const token_model_1 = require("../models/token.model");
class TokenRepository {
    async create(data) {
        return await token_model_1.Token.create(data);
    }
    async getOneBy(params) {
        return await token_model_1.Token.findOne(params);
    }
    async deleteOneByParams(params) {
        await token_model_1.Token.deleteOne(params);
    }
    async createActionToken(data) {
        return await action_model_1.ActionToken.create(data);
    }
    async findActionTokenByParams(params) {
        return await action_model_1.ActionToken.findOne(params);
    }
}
exports.tokenRepository = new TokenRepository();
