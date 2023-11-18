import express from "express";
import {
  deleteUser,
  updateUser,
  userListing,
} from "../controllers/user.controller.js";
import { verifyAccessToken } from "../helper/jwt_helper.js";

const router = express.Router();

router.use(verifyAccessToken);

router.put("/update", updateUser);

router.delete("/delete/:id", deleteUser);

router.get("/listings", userListing);

export default router;
