import { EEmailAction } from "../enums/email-action.enum";

export const emailTemplate = {
  [EEmailAction.WELCOME]: {
    templateName: "welcome",
    subject: "Happy to see you",
  },
  [EEmailAction.FORGOT_PASSWORD]: {
    templateName: "forgot-password",
    subject: "don't worry bro",
  },
};
