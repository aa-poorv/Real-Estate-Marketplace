import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
  res.json({
    message: "Hello This is the test Api!!",
  });
};

export const updateUser = async (req, res, next) => {
  const { username, email, password, avatar } = req.body;
  const id = req.userId;
  let user;
  try {
    if (password.length === 0) {
      user = await User.findByIdAndUpdate(
        id,
        { username, email, avatar },
        { new: true }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.findByIdAndUpdate(
        id,
        { username, email, password: hashedPassword, avatar },
        { new: true }
      );
    }
    const { password: _, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.userId;
    const deleteingId = req.params.id;
    console.log(id, deleteingId);
    console.log(deleteingId !== id);
    if (deleteingId !== id) throw errorHandler(401, "Not allowed to delete");

    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.clearCookie("jwt");
      res.status(200).json("User deleted successfully");
    } else res.status(404).json("Deletion falied due to user not found");
  } catch (err) {
    next(err);
  }
};

export const userListing = async (req, res, next) => {
  try {
    const id = req.userId;
    const listings = await Listing.find({ userRef: id });
    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};
