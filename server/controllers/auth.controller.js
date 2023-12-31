import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import { signAccessToken } from "../helper/jwt_helper.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    res.status(201).json("User created Successfully!!");
  } catch (err) {
    next(errorHandler(550, "Error from the function"));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.checkUser(email, password);
    if (!validUser)
      return next(errorHandler(404, "email/password is not valid"));
    const token = await signAccessToken(validUser.id);
    res.cookie("jwt", token, { httpOnly: true });
    const { password: _, ...userData } = validUser._doc;
    res.status(200).json(userData);
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const token = await signAccessToken(user.id);
      const { password: _, ...rest } = user._doc;
      res.cookie("jwt", token, { httpOnly: true }).status(200).json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const username =
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        avatar: photo,
      });
      await newUser.save();
      const token = await signAccessToken(newUser.id);
      const { password: _, ...rest } = newUser._doc;
      res.cookie("jwt", token, { httpOnly: true }).status(200).json(rest);
    }
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await User.findById(id);
    if (user) {
      res.clearCookie("jwt");
      res.status(200).json("User is logged out");
    } else res.status(404).json("Logout failed due to user not found");
  } catch (err) {
    next(err);
  }
};
