import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { ApiError } from "./errors/api.error";
import { adminRouter } from "./routers/admin.router";
import { authRouter } from "./routers/auth.router";
import { UserRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/users", UserRouter);
app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    return res.status(err?.status || 500).json({
      message: err?.message,
      status: err?.status,
    });
  },
);

const PORT = 3000;
const MONGO_DB =
  "mongodb+srv://levchukrs96:uawow9668@cluster0.kp1mb1o.mongodb.net/levchukrs1";
app.listen(PORT, async () => {
  await mongoose.connect(MONGO_DB);
  console.log("Server has started");
});
