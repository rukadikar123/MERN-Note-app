import { User } from "../Models/user.model.js";
import bcryptjs from "bcryptjs";

// Signup Controller: Handles user registration
export const signup = async (req, res) => {
  // Destructure the user input (userName, email, and password) from the request body
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    throw new Error("All fields required");
  }

  try {
    // check if user already registered
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "email already exist",
      });
    }

    // hash the password before saving it in DB
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // create and save new user in DB
    const newUser = await User.create({
      userName: userName.toLowerCase(),
      email,
      password: hashedPassword,
    });

    // retrieve users data
    const user = await User.findById(newUser._id).select("-password");

    if (!user) {
      throw new Error("Something went wrong while registering the user");
    }

    // send response
    return res.status(200).json({
      success: true,
      message: "user created successfully",
      user,
    });
  } catch (error) {
    // Handle errors
    throw new Error(error);
  }
};

// Login Controller
export const login = async (req, res) => {
  // Destructure the user input (userName, email) from the request body
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("All fields required");
  }

  try {
    // Find the user on the basis of email
    const isEmailExist = await User.findOne({ email });
    if (!isEmailExist) {
      return res.status(400).json({
        success: false,
        message: "user nor found",
      });
    }

    // check if user's password is matching with password in DB
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      isEmailExist.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generate an access token for the existing user
    const token = await isEmailExist.generateAccessToken();

    // Store the access token in an HTTP-only cookie
    res.cookie("accessToken", token, {
      httpOnly: true, // Cookie cannot be accessed by JavaScript (prevents XSS attacks)
      maxAge: 4 * 60 * 60 * 1000, // 4 hours
    });

    // Remove the password field from the user object before sending the response
    isEmailExist.password = undefined;

    // Send a successful login response with the user data
    res.status(200).json({
      succes: true,
      user: isEmailExist,
      message: "Login successful",
      token,
    });
  } catch (error) {
    // handle errors
    throw new Error(error);
  }
};

export const getUserProfile=async(req,res)=>{
  const user=req.user
  
  res.status(200).json({
    success:true,
    user
  })
}


// Logout Controller
export const logout = async (req, res) => {
  try {
    // Clear the access token cookie to log the user out
    res.clearCookie("accessToken", {
      httpOnly: true,
    });
    // Send a response confirming successful logout
    res.status(200).json({
      success: true,
      message: "User logout successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
};
