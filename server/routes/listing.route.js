import express from "express";
import { verifyAccessToken } from "../helper/jwt_helper.js";
import {
  createListing,
  deleteListing,
  getListingData,
  getListings,
  updateListing,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/", verifyAccessToken, createListing);

router.delete("/delete/:id", verifyAccessToken, deleteListing);

router.get("/:id", getListingData);

router.get("/", getListings);

router.put("/update/:id", verifyAccessToken, updateListing);

export default router;
