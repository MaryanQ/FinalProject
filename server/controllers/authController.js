import { AuthModel } from "../models/authModel.js";
import jwt from "jsonwebtoken";

// Controller to handle authentication
const authController = {
  loginUser: (req, res) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    // Call the model to verify user credentials
    AuthModel.loginUser(email, password, (error, results) => {
      if (error) {
        console.error("Error during login query:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      // Check if a user record was found
      if (results.length > 0) {
        // Use the first (or only) result found
        const user = results[0];
        const token = jwt.sign(
          { email: user.email },
          process.env.JWT_SECRET || "jwt_secret_key", // Store this securely
          { expiresIn: "1d" }
        );

        return res.status(200).json({ token });
      } else {
        return res
          .status(401)
          .json({ message: "Unauthorized: Invalid credentials" });
      }
    });
  },
};

export default authController;
