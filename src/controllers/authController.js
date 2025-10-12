import User from "../models/userModel.js";
import Company from "../models/companyModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import ApiResponse from "../utils/ApiResponse.js";
import sendEmail from "../utils/sendEmail.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, companyName } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json(new ApiResponse(400, "Email exists"));
  const company = await Company.create({ name: companyName, email });
  const user = await User.create({
    name,
    email,
    password,
    company: company._id,
    role: "admin",
  });
  user.subscriptionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await user.save();
  const token = generateToken(user._id);
  res.cookie("token", token, { httpOnly: true });
  sendEmail({
    to: user.email,
    subject: "Welcome",
    text: "Welcome to ShopLedger",
  }).catch(console.error);
  res.status(201).json(new ApiResponse(201, "Registered", { user }));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json(new ApiResponse(401, "Invalid credentials"));
  const match = await user.matchPassword(password);
  if (!match)
    return res.status(401).json(new ApiResponse(401, "Invalid credentials"));
  const token = generateToken(user._id);
  res.cookie("token", token, { httpOnly: true });
  res.json(new ApiResponse(200, "Logged in", { user }));
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.json(new ApiResponse(200, "Logged out"));
});

export const profile = asyncHandler(async (req, res) => {
  res.json(new ApiResponse(200, "Profile fetched", { user: req.user }));
});
