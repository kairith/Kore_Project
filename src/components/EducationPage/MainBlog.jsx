import React from "react";
import MainBlog1 from "../../assets/EducationPage/MainBlog1.jpg";
import video1 from "../../assets/EducationPage/video1/video1.mp4";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const MainBlog = () => {
    return (
        <div className="relative">
            {/* First Section */}
            <div className="wave-hidden-md bg-gray-100 hidden md:hidden lg:block">
                <svg width="100%" height="337px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,64L60,90.7C120,117,240,171,360,165.3C480,160,600,96,720,85.3C840,75,960,117,1080,133.3C1200,149,1320,139,1380,133.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
            </div>
            <div className="relative bg-gray-100 pt-30 md:pt-2 pb-22">
                <div className="container mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

                    {/* Left Section - Image with Small Title */}
                    <div className="relative flex justify-center lg:justify-start">
                        {/* Small title positioned above the image */}
                        <motion.h2
                            variants={fadeIn("right", 0.3)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            className="absolute top-[-4rem] md:top-[-6rem] left-0 text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                            អត្ថបទ
                        </motion.h2>
                        <motion.img
                            variants={fadeIn("right", 0.3)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            src={MainBlog1}
                            alt="Hero Illustration"
                            className="w-full max-w-xl rounded-lg shadow-lg duration-300 hover:shadow-xl hover:shadow-sky-100"
                        />
                    </div>

                    {/* Right Section - Main Heading & Content */}
                    <motion.div
                        variants={fadeIn("left", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.7 }}
                        className="text-left">
                        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-2 leading-tight">
                            អារម្មណ៍បន្ទាប់ពីដឹងថាមានផ្ទៃពោះ: ត្រូវធ្វើអ្វី?
                        </h1>
                        <p className="font-bold text-[16px] sm:text-lg md:text-xl text-gray-900 mb-2">
                            ដំណើរការសម្រេចចិត្តដំបូង
                        </p>
                        <p className="font-regular text-gray-700 text-[16px] sm:text-lg mb-6 leading-relaxed">
                            ផ្សាយពានិច្ចប្រជុំអ្នកទាំងអស់គ្នាសម្រាប់អាហារូបត្ថម្ភសុខភាពផ្លូវចិត្ត
                            និងអារម្មណ៍ដំបូងបន្ទាប់ពីរកឃើញការមានផ្ទៃពោះ។
                        </p>
                        <a href="#" className="text-rose-300 text-[16px] sm:text-lg font-bold inline-flex transition duration-300 hover:text-blue-300">
                            ស្វែងយល់បន្ថែម →
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Second Section */}
            <div className="relative bg-white mt-10 pt-28 pb-34">
                <div className="container mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

                    {/* Right Section - Image with Small Title */}
                    <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
                        {/* Small title positioned above the image */}
                        <motion.h2
                            variants={fadeIn("left", 0.3)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            className="absolute top-[-4rem] md:top-[-6rem] text-2xl sm:text-3xl font-bold text-rose-300 sm:text-right w-full">
                            វីដេអូ
                        </motion.h2>
                        {/* <motion.video
                            variants={fadeIn("left", 0.3)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            src={MainBlog1}
                            alt="Hero Illustration"
                            className="w-full max-w-xl rounded-lg shadow-lg duration-300 hover:shadow-xl hover:shadow-sky-100"
                        /> */}
                        <motion.video
                            variants={fadeIn("left", 0.3)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            src={video1}
                            controls
                            className="w-full max-w-xl rounded-lg shadow-lg duration-300 hover:shadow-xl hover:shadow-sky-100"
                        >
                        </motion.video>
                    </div>

                    {/* Left Section - Main Heading & Content */}
                    <motion.div
                        variants={fadeIn("right", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.7 }}
                        className="text-left order-2 lg:order-1">
                        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-2 leading-tight">
                            តើអ្នកអាចហាត់ប្រាណក្នុងអំឡុងពេលមានផ្ទៃពោះបានទេ?
                        </h1>
                        <p className="font-bold text-[16px] sm:text-lg md:text-xl text-gray-900 mb-2">
                            ដំណើរការក្នុងការហាត់ប្រាណដំបូង
                        </p>
                        <p className="font-regular text-gray-700 text-[16px] sm:text-lg mb-6 leading-relaxed">
                            ការហាត់ប្រាណពេលមានផ្ទៃពោះគឺមានសុវត្ថិភាព និងសុខភាពល្អសម្រាប់អ្នក និងទារករបស់អ្នក។
                        </p>
                        <a href="http://localhost:5173/%E1%9E%80%E1%9E%B6%E1%9E%9A%E1%9E%A2%E1%9E%94%E1%9F%8B%E1%9E%9A%E1%9F%86/%E1%9E%9C%E1%9E%B8%E1%9E%8A%E1%9F%81%E1%9E%A2%E1%9E%BC" className="text-rose-300 text-[16px] sm:text-lg font-bold inline-flex transition duration-300 hover:text-blue-300">
                            ស្វែងយល់បន្ថែម →
                        </a>
                    </motion.div>
                </div>
            </div>

        </div>
    );
};

export default MainBlog;
