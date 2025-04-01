import jwt from "jsonwebtoken";
import { User } from "../Models/user.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    // get the access token
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Unauthorized request");
    }

    // Verify the token using the secret key from environment variables
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // retrieving the user based on the ID from the decoded token
    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      throw new Error("Invalid Access Token");
    }

    // Attach the found user (excluding password) to the request object    
    req.user = user;
    next();
  } catch (error) {                             // handle the errors
    return res  
      .status(401)
      .json({ message: error?.message || "Token verification failed." });
  }
};
