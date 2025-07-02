import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(401)
        .json({
          success: false,
          message: "No token provided. Please login again.",
        });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Invalid token. Please login again.",
        });
    }
    next();
  } catch (error) {
    console.error("AdminAuth Error:", error);
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({
          success: false,
          message: "Invalid token format. Please login again.",
        });
    }
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({
          success: false,
          message: "Token expired. Please login again.",
        });
    }
    res
      .status(500)
      .json({
        success: false,
        message: "Authentication error. Please try again.",
      });
  }
};

export default adminAuth;
