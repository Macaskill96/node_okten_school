import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

export const UserRouter = router;

router.get("", userController.getAll);

router.get("/:id", commonMiddleware.isValid, userController.getById);

router.delete("/:id", userController.deleteById);

router.put("/:id", userController.updateById);
