import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";
import { IUser } from "../types/user.type";

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();

      return res.json({ data: users });
    } catch (e) {
      next(e);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const user = await userService.getById(id);

      res.json({ data: user });
    } catch (e) {
      next(e);
    }
  }
  public async deleteById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await userService.deleteById(id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const body = req.body as Partial<IUser>;
    try {
      const user = await userService.updateById(id, body);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
