import React from "react";
import MainSection1 from "../../assets/HomePage/MainSection1.jpg";
import MainSection2 from "../../assets/HomePage/MainSection2.jpg";
import MainSection3 from "../../assets/HomePage/MainSection3.jpg";
import { motion } from "framer-motion";
import { fadeIn } from "../variants"

const HeroSection = () => {
    return (
        <div className="relative">
            {/* First Hero Section */}
            <div className="relative bg-blue-300 md:bg-gradient-to-b from-blue-300 to-white md:pb-24">
                <div className="container mx-auto px-6 py-30 md:py-45 sm:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

                    {/* Left Section - Text Content */}
                    <motion.div
                        variants={fadeIn("right", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.7 }}
                        className="text-center sm:text-left lg:justify-start">
                        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-4">
                            ចំណេះដឹងអប់រំសុខភាពផ្ទាល់ខ្លួន
                        </h1>
                        <p className="font-regular text-[16px] sm:text-lg lg:text-xl text-gray-900 mb-6">
                            រៀនអំពីការថែទាំសុខភាពអាហារូបត្ថម្ភ និងសុខភាពផ្លូវចិត្ត ក្នុងអំឡុងពេលមានផ្ទៃពោះ
                        </p>
                        <a href="#" className="text-rose-300 text-[16px] sm:text-lg md:mb-12 font-bold inline-flex transition duration-300 hover:text-white">
                            ស្វែងយល់បន្ថែម →
                        </a>
                    </motion.div>

                    {/* Right Section - Image */}
                    <div className="flex justify-center lg:justify-end">
                        <motion.img
                            variants={fadeIn("left", 0.3)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            src={MainSection1}
                            alt="Hero Illustration"
                            className="w-full max-w-[500px] h-[300px] object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-300"
                        />
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-b to-rose-100 hidden md:block ">
                    <svg width="100%" height="337.5px" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#ffe4e6" fillOpacity="1" d="M0,160L60,170C120,180,240,220,360,230C480,240,600,220,720,200C840,180,960,160,1080,170C1200,180,1320,210,1440,220V320H0Z"></path>
                    </svg>
                </div>
            </div>

            {/* Second Hero Section */}
            <div className="relative bg-rose-100 pb-24 md:pb-52">
                <div className="container mx-auto px-6 py-16 md:py-15 sm:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

                    <motion.div
                        variants={fadeIn("left", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.7 }}
                        className="lg:hidden text-center sm:text-left">
                        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-4">
                            ចែករំលែក
                        </h1>
                        <p className="font-regular text-[16px] sm:text-lg lg:text-xl text-gray-900 mb-6">
                            ភ្ជាប់ជាមួយស្រ្តីមានផ្ទៃពោះដទៃទៀត ដើម្បីចែករំលែកបទពិសោធន៍ និងទទួលបានការគាំទ្រ
                        </p>
                        <a href="#" className="text-rose-300 text-[16px] sm:text-lg md:mb-14 font-bold inline-flex transition duration-300 hover:text-white">
                            ស្វែងយល់បន្ថែម →
                        </a>
                    </motion.div>

                    {/* Left Section - Image */}
                    <motion.div
                        variants={fadeIn("right", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.7 }}
                        className="flex justify-center lg:justify-start">
                        <img
                            src={MainSection2}
                            alt="Hero Illustration"
                            className="w-full max-w-[500px] h-[300px] object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:shadow-rose-200"
                        />
                    </motion.div>

                    {/* Right Section  */}
                    <motion.div
                        variants={fadeIn("left", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.7 }}
                        className="hidden lg:block text-center sm:text-left lg:ml-10">
                        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-4">
                            ចែករំលែក
                        </h1>
                        <p className="font-regular text-[16px] sm:text-lg lg:text-xl text-gray-900 mb-6">
                            ភ្ជាប់ជាមួយស្រ្តីមានផ្ទៃពោះដទៃទៀត ដើម្បីចែករំលែកបទពិសោធន៍ និងទទួលបានការគាំទ្រ
                        </p>
                        <a href="#" className="text-rose-300 text-[16px] sm:text-lg md:mb-14 mb-14 font-bold inline-flex transition duration-300 hover:text-white">
                            ស្វែងយល់បន្ថែម →
                        </a>
                    </motion.div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-b to-blue-100 hidden md:block">
                    <svg width="100%" height="337.5px" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#dbeafe" fillOpacity="1" d="M0,160L60,170C120,180,240,220,360,230C480,240,600,220,720,200C840,180,960,160,1080,170C1200,180,1320,210,1440,220V320H0Z"></path>
                    </svg>
                </div>
            </div>

            {/* Third Hero Section */}
            <div className="relative bg-gradient-to-b from-blue-100 to-blue-200 pb-32 ">
                <div className="container mx-auto px-6 py-16 md:py-2 sm:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

                    {/* Left Section - Text Content */}
                    <motion.div
                        variants={fadeIn("right", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.7 }}
                        className="text-center sm:text-left lg:justify-start">
                        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-4">
                            ពិភាក្សាជាមួយ AI
                        </h1>
                        <p className="font-regular text-[16px] sm:text-lg lg:text-xl text-gray-900 mb-6">
                            ឆ្លើយសំណួរអំពីសុខភាពការមានផ្ទៃពោះរបស់អ្នកតាមរយៈ AI ជាភាសាខ្មែរ
                        </p>
                        <a href="#" className="text-rose-300 text-[16px] sm:text-lg font-bold inline-flex transition duration-300 hover:text-white">
                            ស្វែងយល់បន្ថែម →
                        </a>
                    </motion.div>

                    {/* Right Section - Image */}
                    <motion.div
                        variants={fadeIn("left", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.7 }}
                        className="flex justify-center lg:justify-end">
                        <img
                            src={MainSection3}
                            alt="Hero Illustration"
                            className="w-full max-w-[500px] h-[300px] object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-300"
                        />
                    </motion.div>
                </div>
            </div>
        </div >
    );
}

export default HeroSection;