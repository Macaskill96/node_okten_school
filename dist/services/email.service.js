"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const node_path_1 = __importDefault(require("node:path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const config_1 = require("../configs/config");
const email_constant_1 = require("../constants/email.constant");
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: config_1.configs.SMTP_USER,
                pass: config_1.configs.SMTP_PASSWORD,
            },
        });
        const hbsOption = {
            viewEngine: {
                extname: ".hbs",
                defaultLayout: "main",
                layoutsDir: node_path_1.default.join(process.cwd(), "src", "templates", "layouts"),
                partialsDir: node_path_1.default.join(process.cwd(), "src", "templates", "partials"),
            },
            viewPath: node_path_1.default.join(process.cwd(), "src", "templates", "views"),
            extName: ".hbs",
        };
        this.transporter.use("compile", (0, nodemailer_express_handlebars_1.default)(hbsOption));
    }
    async sendMail(email, emailAction, context) {
        const { templateName, subject } = email_constant_1.emailTemplate[emailAction];
        context.frontUrl = config_1.configs.FRONT_URL;
        const emailOptions = {
            to: email,
            subject: subject,
            template: templateName,
            context: context,
        };
        await this.transporter.sendMail(emailOptions);
    }
}
exports.emailService = new EmailService();
