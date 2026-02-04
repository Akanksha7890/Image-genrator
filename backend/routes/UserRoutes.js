import express from "express";
import { registerUser, loginUser, userCredits } from "../controllers/userController.js";
import userAuth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route
router.get("/credits", userAuth, userCredits); // ✅ middleware + controller

export default router;
