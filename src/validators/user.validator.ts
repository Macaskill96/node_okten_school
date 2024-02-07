import joi from "joi";

import { regexConstant } from "../constants/regex.constant";

export class UserValidator {
  private static email = joi
    .string()
    .lowercase()
    .regex(regexConstant.EMAIL)
    .trim();
  private static password = joi.string().regex(regexConstant.PASSWORD).trim();
  private static userName = joi.string().min(3).max(40).trim();

  public static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
  public static create = joi.object({
    email: this.email.required(),
    password: this.password.required(),
    name: this.userName.required(),
  });
  public static update = joi.object({
    name: this.userName,
  });
  public static forgotPassword = joi.object({
    email: this.email.required(),
  });
  public static newPassword = joi.object({
    newPassword: this.password.required(),
  });
}
