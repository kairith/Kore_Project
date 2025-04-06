import React from "react";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import VideoPage from "../components/VideoPage/VideoPage";

const Video = () => {
    return (
        <div>
            <Navbar />
            <VideoPage />
            <Footer />
        </div>
    );
}

export default Video;