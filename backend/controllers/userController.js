import userModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Request body:", req.body);

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    console.log("Existing user:", existingUser);
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await userModel.create({
      name,
      email,
      password: hashed
    });
     console.log("User created:", user);

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: { name: user.name }
    });

  } catch (error) {
     console.error("Register error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: { name: user.name }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET CREDITS
export const userCredits = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      creditBalance: user.creditBalance,
      user: { name: user.name }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Payment
// Payment (Fake / Demo) - Add at the bottom of userController.js
export const fakePayment = async (req, res) => {
  try {
    const userId = req.userId       // auth middleware se milega
    const { plan } = req.body       // plan = 'basic', 'pro', 'premium'

    if (!userId || !plan) {
      return res.status(400).json({ success: false, message: 'Missing details' })
    }

    let credits = 0
    if (plan === 'basic') credits = 5
    if (plan === 'pro') credits = 10
    if (plan === 'premium') credits = 20

    const user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    user.creditBalance += credits
    await user.save()

    res.json({
      success: true,
      message: 'Payment Successful (Demo)',
      addedCredits: credits,
      totalCredits: user.creditBalance
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
