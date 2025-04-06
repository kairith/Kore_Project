import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; 
import sgMail from "@sendgrid/mail";
import multer from "multer";    
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url"; // Required for `__dirname` in ES module

// Fix `__dirname` in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Explicitly load `.env` from `../server/.env`
dotenv.config({ path: path.join(__dirname, "../server/.env") });

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

// Debugging: Ensure `JWT_SECRET` is loaded
console.log("🔍 JWT_SECRET:", SECRET_KEY || "❌ Not Loaded!");

// Ensure SendGrid API Key is set
if (!process.env.SENDGRID_API_KEY) {
    console.error("❌ ERROR: SENDGRID_API_KEY is missing!");
} else {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Set up Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../data/UserImage");
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    }
});
const upload = multer({ storage: storage });
router.post("/signup", upload.single('profileImage'), async (req, res) => {
    try {
        console.log("🔥 Entering /signup endpoint");
        const { firstName, lastName, phone, email, password } = req.body;
        const profileImage = req.file ? req.file.path : null;

        console.log("🔹 Received Data:", { firstName, lastName, phone, email, password, profileImage });

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("❌ Email already in use");
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("✅ Hashed Password:", hashedPassword);

        const newUser = new User({
            firstName,
            lastName,
            phone: phone || "",
            email,
            password: hashedPassword,
            profileImage: profileImage || null,
        });

        await newUser.save();
        console.log("📝 User saved successfully!");

        const token = jwt.sign(
            { userId: newUser._id.toString(), email: newUser.email },
            process.env.JWT_SECRET || 'f9d7ce783bf8a7b60c1ec59573628a31557cf0eae409792a8a5bb7195a0d728a2d1c0f6e8c47039c08cded51c2a3f2a97531957f53e189779d72a0952b93bbf2',
            { expiresIn: '30m' }
        );
        console.log("🔍 Generated Token:", token);

        const response = {
            message: "Signup successful!",
            token,
            user: {
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                phone: newUser.phone,
                profileImage: newUser.profileImage,
            },
        };
        console.log("🔍 Response Prepared:", response);
        res.status(201).json(response);
    } catch (error) {
        console.error("❌ Signup Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// User Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("🔍 Login attempt for:", email);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User not found");
            return res.status(404).json({ message: "User not found" });
        }
        console.log("📌 Stored Hashed Password in DB:", user.password);
        console.log("📌 Entered Password:", password);

        if (password.startsWith("$2b$")) {
            console.error("⚠️ ERROR: Entered password is already hashed! This is wrong.");
            return res.status(400).json({ message: "Invalid login attempt" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔍 Password Match Result:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
             process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
       
        

        res.status(200).json({ message: "Login successful", token, user });

    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Check Email API
router.post("/check-email", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required." });
    }
    try {
        const user = await User.findOne({ email });
        return res.json({ exists: !!user });
    } catch (error) {
        console.error("Error checking email:", error);
        return res.status(500).json({ message: "Server error" });
    }
});
// Function to generate a random OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

// Forgot Password API
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "Email not found" });
        }

        const otp = generateOTP();
        
        // Save OTP to the user in the database
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();
        // Send OTP via SendGrid
        const msg = {
            to: email,
            from: process.env.EMAIL_USER, // Verified sender email
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${otp}. It expires in 10 minutes.`,
        };

        await sgMail.send(msg);
        return res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        console.error("Error in forgot password:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
// Verify OTP
router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        console.log("User OTP:", user ? user.otp : "User not found");
        console.log("Entered OTP:", otp);
        console.log("OTP Expires:", user ? user.otpExpires : "User not found");

        if (user && String(user.otp) === String(otp) && user.otpExpires > Date.now()) {
            user.otp = null; // Clear OTP after successful verification
            user.otpExpires = null; // Clear expiration time
            await user.save();
            res.json({ message: "OTP verified, proceed to reset password." });
        } else {
            res.status(400).json({ message: "Invalid or expired OTP." });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Check for required fields
        if (!email || !newPassword) {
            return res.status(400).json({ message: "Email and new password are required." });
        }

        console.log("📌 Reset Password Request for:", email);

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword; // Update user's password

        // Log the hashed password for debugging
        console.log("Updated Hashed Password:", user.password);

        // Save the updated user document
        await user.save();

        // Test the new password
        const isVerified = await bcrypt.compare(newPassword, user.password);
        console.log("Password Verified after reset:", isVerified); // Should print true

        res.json({ message: "Password reset successful. You can now log in with your new password." });
    } catch (error) {
        console.error("❌ Reset Password Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


async function checkPassword() {
    const password = "123"; // Replace with the entered password
    const storedHash = ""; // Replace with the hash from DB

    console.log("Entered Password:", password);
    console.log("Stored Hash:", storedHash);

    const isMatch = await bcrypt.compare(password, storedHash);
    console.log("Password Match Result:", isMatch);
}

checkPassword();

export default router;


router.get("/profile/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password"); // Exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error" });
    }
});
