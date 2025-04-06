import { useState } from "react";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import CardAdvice from "../components/HomePage/CardAdvice";
import HeroSection from "../components/HomePage/HeroSection";
import LessonSection from "../components/HomePage/LessonSection";
import SlideAnimation from "../components/HomePage/SlideAnimation";
import AuthForm from "../components/SignUp/SignUp";

const Home = () => {

    const [showAuthForm, setShowAuthForm] = useState(false);

    return (
        <div className="relative">
            <div className={`transition-all duration-300 ${showAuthForm ? "backdrop-blur-lg" : ""}`}>
                <Navbar setShowAuthForm={setShowAuthForm} />
                <SlideAnimation />
                <CardAdvice />
                <HeroSection />
                <LessonSection />
                <Footer />
            </div>

            {/* ✅ Auth Form Popup */}
            {showAuthForm && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <AuthForm closeModal={() => setShowAuthForm(false)} />
                </div>
            )}
        </div>
    );
};

export default Home;
