import express from "express";
import * as userController from "../controllers/Users.controller.js";
import { Authorization } from "../middlewares/Authorization.middleware.js";
const router = express.Router();

router.get("/users/me", Authorization, userController.getUsersUrls);

export default router;