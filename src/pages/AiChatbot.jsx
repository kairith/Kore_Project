import React, { useState, useEffect, useContext } from "react";
import AuthForm from "../components/SignUp/SignUp";
import ChatBotUI from "../components/AiChatbot/ChatBot";
import Navbar from "../components/Header/Navbar";
import { AuthContext } from "../AuthContext"; // Adjust path as needed

const AiChatbots = () => {
    const { user, login } = useContext(AuthContext);
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    useEffect(() => {
        // Check if user is authenticated via AuthContext
        if (!user) {
            setShowAuthPopup(true);
        }
    }, [user]);

    const handleAuthSuccess = (userData) => {
        login(userData, userData.token); // Use your AuthContext login function
        setShowAuthPopup(false);
    };

    return (
        <div>
            <Navbar />
            
            {/* Auth Popup */}
            {showAuthPopup && (
                <AuthForm 
                    closeModal={() => setShowAuthPopup(false)}
                    onAuthSuccess={handleAuthSuccess}
                />
            )}

            {/* Only show chatbot if authenticated */}
            {user && <ChatBotUI />}
        </div>
    );
}

export default AiChatbots;