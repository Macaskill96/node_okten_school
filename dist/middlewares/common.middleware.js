"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMiddleware = void 0;
const mongoose_1 = require("mongoose");
const api_error_1 = require("../errors/api.error");
class CommonMiddleware {
    isIdValid(req, res, next) {
        try {
            const id = req.params.id;
            if (!(0, mongoose_1.isObjectIdOrHexString)(id)) {
                throw new Error("wrong ID param");
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    isBodyValid(validator) {
        return function (req, res, next) {
            try {
                const { value, error } = validator.validate(req.body);
                if (error) {
                    throw new api_error_1.ApiError(error.details[0].message, 400);
                }
                req.body = value;
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
}
exports.commonMiddleware = new CommonMiddleware();
