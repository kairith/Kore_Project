import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailExists, setEmailExists] = useState(false); // Add this
    const navigate = useNavigate();



    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
      
        try {
          const response = await fetch("http://localhost:5020/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            throw new Error(data.message || "Login failed");
          }
      
          console.log("✅ Login Successful:", data);
          console.log("User Data:", data.user);
      
          if (!data.user || !data.user.email) {
            throw new Error("User email not found in response");
          }
      
          // Save token and user to sessionStorage so other components can use it
          sessionStorage.setItem("token", data.token); // ✅ Save token
          sessionStorage.setItem("user", JSON.stringify(data.user)); // ✅ Save user info (optional)
      
          // Save to AuthContext (if you're using context)
          login(data.token, data.user);
      
          // Optional: Fetch user's posts right after login
          if (data.user.posts && data.user.posts.length > 0) {
            try {
              const postResponse = await fetch("http://localhost:5020/api/posts", {
                headers: { Authorization: `Bearer ${data.token}` },
              });
      
              const postData = await postResponse.json();
      
              if (!postResponse.ok) {
                throw new Error(postData.message || "Failed to fetch posts");
              }
      
              console.log("📌 User Posts:", postData);
            } catch (err) {
              console.error("❌ Error fetching posts:", err);
            }
          } else {
            console.log("📌 No posts available for this user.");
          }
      
          // Redirect based on user role/email
          if (data.user.email === "dararithzone@gmail.com" && password === "admin123") {
            console.log("✅ Recognized as Admin, navigating to /dashboard");
            navigate("/dashboard");
          } else {
            console.log("Navigating to /community");
            navigate("/community");
          }
      
        } catch (error) {
          console.error("❌ Login Error:", error);
          alert(error.message || "Server error!");
        } finally {
          setLoading(false);
        }
      };
      

    
    const checkEmailExists = async () => {
        if (!forgotEmail) {
            alert("Please enter an email.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:5020/api/auth/check-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: forgotEmail }),
            });

            const data = await response.json();

            if (response.ok) {
                setEmailExists(data.exists);
                alert(data.exists ? "Email exists. You can now send the OTP." : "Email does not exist.");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Check Email Error:", error);
            alert("Server error!");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!emailExists) {
            alert("Please check if the email exists first.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:5020/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: forgotEmail }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("OTP sent to your email!");
                setOtpSent(true);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Forgot Password Error:", error);
            alert("Server error!");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5020/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: forgotEmail, otp }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("OTP Verified! Redirecting to reset password...");
                navigate(`/reset-password?email=${forgotEmail}`);
            } else {
                alert("Invalid OTP or OTP has expired.");
            }
        } catch (error) {
            console.error("OTP Verification Error:", error);
            alert("Server error!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
            </form>

            <button onClick={() => setShowForgotPassword(true)}>Forgot Password?</button>

            {showForgotPassword && (
                <div className="modal">
                    <h3>Forgot Password</h3>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={forgotEmail}
                        onChange={(e) => {
                            setForgotEmail(e.target.value);
                            setEmailExists(false); // Reset emailExists when changing email
                        }}
                        required
                    />
                    <button onClick={checkEmailExists} disabled={loading}>{loading ? "Checking..." : "Check Email"}</button>
                    {emailExists && !otpSent && (
                        <button onClick={handleForgotPassword} disabled={loading}>{loading ? "Sending..." : "Send OTP"}</button>
                    )}
                    {otpSent && (
                        <>
                            <input
                                type="number"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                            <button onClick={handleVerifyOtp} disabled={loading}>{loading ? "Verifying..." : "Verify OTP"}</button>
                        </>
                    )}
                    <button onClick={() => setShowForgotPassword(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default Login;