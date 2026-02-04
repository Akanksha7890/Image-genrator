import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.json({ success: false, message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
