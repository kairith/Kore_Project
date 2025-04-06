import React from "react";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import SlidShow from "../components/EducationPage/SlideShow";
import CardSection from "../components/EducationPage/CardSection";
import MainBlog from "../components/EducationPage/MainBlog";

const Educational = () => {
    return (
        <div>
            <Navbar />
            <SlidShow />
            <CardSection />
            <MainBlog />
            <Footer />
        </div>
    );
}

export default Educational;