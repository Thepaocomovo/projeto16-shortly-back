import express from "express";
import * as urlController from "../controllers/Url.controller.js";
import { Authorization } from "../middlewares/Authorization.middleware.js";
const router = express.Router();

router.post("/urls/shorten", Authorization, urlController.shortenUrl);
router.get("/urls/:id", urlController.getUrlById);
router.get("/urls/open/:shortUrl", urlController.openUrl);
router.delete("/urls/:id", Authorization, urlController.deleteUrl);

export default router;