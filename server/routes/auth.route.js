import express from "express";
import {
  googleAuth,
  logout,
  signin,
  signup,
} from "../controllers/auth.controller.js";
import { logoutChecker } from "../helper/jwt_helper.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/google", googleAuth);

router.post("/logout", logoutChecker, logout);

export default router;
