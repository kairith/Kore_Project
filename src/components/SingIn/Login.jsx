import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [emailExists, setEmailExists] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        console.log("📌 Sending Login Request:", { email, password }); // Debug here
    
        try {
            const response = await fetch("http://localhost:5020/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            console.log("📌 Server Response:", data);
    
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }
    
            console.log("✅ Login Successful:", data);
            login(data.token, data.user);
    
            // Check if the logged-in user is the admin
            if (data.user.email === "dararithzone@gmail.com" || password === "admin123") {
                navigate("/dashboard");
            } else {
                navigate("/"); // Navigate to home page for other users
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
