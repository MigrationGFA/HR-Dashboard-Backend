const Token = require("../models/Token.js");

const {
  isAccessTokenValid,
  isRefreshTokenValid,
  generateAccessToken,
} = require("../utils/generateToken");

const authenticatedUser = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split("Bearer ")[1]?.trim();
  const refreshToken = req.headers["refresh-token"];
  console.log("this is refresh token", accessToken);

  try {
    if (!accessToken && !refreshToken) {
      return res.status(401).json({
        msg: "Please login again to continue your process there is no access token",
      });
    }

    // Check if the access token is valid
    try {
      const payload = await isAccessTokenValid(accessToken);
      req.user = payload;
      req.userId = payload.id;
      return next();
    } catch (err) {
      console.log("Access token invalid, checking refresh token...");

      // Access token is invalid, check the refresh token
      try {
        console.log("this got here in refreshtoken 1");
        const payload = await isRefreshTokenValid(refreshToken);
        console.log("this got here in refreshtoken 2");
        // If refresh token is valid, proceed with generating a new access token
        const existingToken = await Token.findOne({ userId: payload.id });
        console.log("this got here in refreshtoken 3");

        if (!existingToken) {
          return res
            .status(401)
            .json({ msg: "Please login again to continue your process" });
        }

        // Generate a new access token
        const newAccessToken = generateAccessToken(user._id, user.role);

        // Attach the user payload to req.user
        req.user = { id: user._id, role: user.role };

        // Send response with new tokens
        res.status(200).json({
          msg: "User login successfully",
          accessToken: newAccessToken,
          refreshToken: refreshToken,
        });

        req.user = payload;
        next();
      } catch (refreshError) {
        console.error("Refresh token validation failed:", refreshError);
        // Refresh token is invalid, prompt the user to log in again
        return res
          .status(401)
          .json({ msg: "Invalid refresh token. Please login again." });
      }
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// middleware/hrAuthentication.js
const hrAuthentication = (req, res, next) => {

  if (!req.user || !req.user.role) {
    return res.status(403).json({ message: "Access denied. User not authenticated." });
  }

  if (req.user.role === "HR") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. You do not have the required role (HR)." });
  }
};

module.exports = {
  authenticatedUser,
  hrAuthentication
};
