import React from "react";
import Navbar from "../components/Header/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import HeroSection from "../components/AboutPage/heroSection.jsx";
import MissionSection from "../components/AboutPage/missionSection.jsx";
import TeamPage from "../components/AboutPage/teamLeader.jsx";
import Card from "../components/AboutPage/card.jsx";

const About = () => {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <MissionSection />
            <Card />
            <TeamPage />
            <Footer />
        </div>
    );
}

export default About;