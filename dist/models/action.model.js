"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionToken = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("./user.model");
const actionTokenSchema = new mongoose_1.Schema({
    actionToken: {
        type: String,
        required: true,
    },
    tokenType: {
        type: String,
        required: true,
    },
    _userId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: user_model_1.User,
    },
});
exports.ActionToken = (0, mongoose_1.model)("actionToken", actionTokenSchema);
