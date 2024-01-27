"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMiddleware = void 0;
const mongoose_1 = require("mongoose");
const api_error_1 = require("../errors/api.error");
class CommonMiddleware {
    isValid(req, res, next) {
        try {
            const id = req.params.id;
            if (!(0, mongoose_1.isObjectIdOrHexString)(id)) {
                throw new api_error_1.ApiError("ID is not valid", 401);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.commonMiddleware = new CommonMiddleware();
