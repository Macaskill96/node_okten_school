import { config } from "dotenv";
config();

export const configs = {
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  JWT_TOKEN_EXPIRES_IN: process.env.JWT_TOKEN_EXPIRES_IN,

  FRONT_URL: process.env.FRONT_URL,
};
