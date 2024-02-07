"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplate = void 0;
const email_action_enum_1 = require("../enums/email-action.enum");
exports.emailTemplate = {
    [email_action_enum_1.EEmailAction.WELCOME]: {
        templateName: "welcome",
        subject: "Happy to see you",
    },
    [email_action_enum_1.EEmailAction.FORGOT_PASSWORD]: {
        templateName: "forgot-password",
        subject: "don't worry bro",
    },
};
