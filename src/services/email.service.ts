import path from "node:path";

import nodemailer, { Transporter } from "nodemailer";
import hbs from "nodemailer-express-handlebars";

import { configs } from "../configs/config";
import { emailTemplate } from "../constants/email.constant";
import { EEmailAction } from "../enums/email-action.enum";
class EmailService {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: configs.SMTP_USER,
        pass: configs.SMTP_PASSWORD,
      },
    });
    const hbsOption = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(process.cwd(), "src", "templates", "layouts"),
        partialsDir: path.join(process.cwd(), "src", "templates", "partials"),
      },
      viewPath: path.join(process.cwd(), "src", "templates", "views"),
      extName: ".hbs",
    };
    this.transporter.use("compile", hbs(hbsOption));
  }
  public async sendMail(
    email: string,
    emailAction: EEmailAction,
    context: Record<string, string | number>,
  ) {
    const { templateName, subject } = emailTemplate[emailAction];
    context.frontUrl = configs.FRONT_URL;
    const emailOptions = {
      to: email,
      subject: subject,
      template: templateName,
      context: context,
    };
    await this.transporter.sendMail(emailOptions);
  }
}

export const emailService = new EmailService();
