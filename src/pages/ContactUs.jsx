import React from "react";  
import Navbar from "../components/Header/Navbar";
import HeroSection from "../components/ContactPage/heroSection";
import HospitalList from "../components/ContactPage/cardHospital";
import Footer from "../components/Footer/Footer";

const Contact = () => {
    return (
        <div>
            <Navbar />  
            <HeroSection />
            <HospitalList />
            <Footer />
        </div>
    )
}

export default Contact;