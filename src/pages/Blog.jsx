import React, { useState } from "react";
import SlideSearch from "../components/BlogPage/SlideSearch";
import BlogPost from "../components/BlogPage/BlogPost";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import NewsBlog from "../components/BlogPage/NewsBlog";

const EducationPage = () => {
    const [filteredBlogs, setFilteredBlogs] = useState([]); // Manage blog data in parent

    return (
        <div>
            <Navbar />
            {/* Single Search Component for the entire page */}
            <SlideSearch setBlogs={setFilteredBlogs} />
            <NewsBlog />
            {/* Pass blogs state to BlogPost */}
            <BlogPost blogs={filteredBlogs} />
            <Footer />
        </div>
    );
};

export default EducationPage;
