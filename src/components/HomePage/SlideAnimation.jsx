import { useState, useEffect } from "react";
import Slide1 from "../../assets/HomePage/Slide1.jpg";
import Slide6 from "../../assets/HomePage/Slide6.jpg";
import Slide3 from "../../assets/HomePage/Slide3.jpg";
import { motion } from "framer-motion";
import { fadeIn } from "../variants"

export default function Carousel({ autoSlide = true, autoSlideInterval = 3000 }) {
    const images = [Slide1, Slide6, Slide3]; // Array of images
    const [curr, setCurr] = useState(0);
    const totalSlides = images.length;

    // Go to the next slide with infinite loop effect
    const next = () => {
        setCurr((prev) => (prev + 1) % totalSlides); // Loop infinitely
    };

    // Go to the previous slide
    const prev = () => {
        setCurr((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    useEffect(() => {
        if (!autoSlide) return;

        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval); // Cleanup interval on unmount
    }, [curr, autoSlide, autoSlideInterval]); // Depend on `curr` so it resets after each slide

    return (
        <div className="overflow-hidden relative mx-auto w-full sm:w-4/5 md:w-3/5 lg:w-5/5
                        h-[50vh] sm:h-[50vh] md:h-[50vh] lg:h-screen backdrop-opacity-100">
            <div
                className="flex transition-transform ease-out duration-700 h-full"
                style={{ transform: `translateX(-${curr * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Overlay on Image */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <motion.h1
                    variants={fadeIn("right", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.7 }}
                    className="font-bold text-3xl sm:text-4xl lg:text-6xl text-sky-300 mt-12 pb-3">ការណែនាំអំពីអ្វីដែលត្រូវធ្វើអំឡុងពេលមានផ្ទៃពោះ</motion.h1>
                <motion.p
                    variants={fadeIn("right", 0.3)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.7 }}
                    className="font-regular text-xl sm:text-2xl lg:text-3xl text-white mt-2">អ្នកអាចទទួលបានរបស់ទាំងនេះដោយការទទួលទានសាច់គ្មានខ្លាញ់</motion.p>
                <motion.button
                    variants={fadeIn("left", 0.3)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.7 }}
                    className="font-regular text-white mt-5 px-6 py-2 sm:px-8 sm:py-2 lg:px-12 lg:py-3 rounded-lg shadow-lg shadow-sky-300/50 bg-sky-300 cursor-pointer transition-all duration-300 ease-in-out hover:font-bold hover:bg-transparent hover:border-2 hover:border-sky-300 hover:text-sky-300">
                   <a href="http://localhost:5173/%E1%9E%80%E1%9E%B6%E1%9E%9A%E1%9E%A2%E1%9E%94%E1%9F%8B%E1%9E%9A%E1%9F%86">ស្វែងយល់បន្ថែម</a>
                </motion.button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 right-0 left-0">
                <div className="flex items-center justify-center gap-3">
                    {images.map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full transition-all
                                ${curr === i ? "bg-white p-1" : "bg-white/50"}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
