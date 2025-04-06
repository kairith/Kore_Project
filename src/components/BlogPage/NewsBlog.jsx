import React from "react";
import P1 from '../../assets/HomePage/P1.jpg';
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const NewsBlog = () => {
    return (
        <div className="relative bg-white ">
            <div className="container mx-auto px-6 pt-30 sm:px-12 lg:px-20">
                <div className="flex flex-col sm:grid sm:grid-cols-2 items-center gap-10">

                    {/* Date - First on Mobile */}
                    <p className="font-regular text-center sm:text-left text-sm sm:text-lg mb-3 sm:hidden">
                        01-01-2025
                    </p>
                    {/* Image Section */}
                    <motion.div
                        variants={fadeIn("left", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.7 }}
                        className="flex justify-center lg:justify-start order-2 sm:order-1">
                        <img
                            src={P1}
                            alt="Hero Illustration"
                            className="w-full max-w-lg rounded-lg shadow-lg shadow-blue-200 transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-300"
                        />
                    </motion.div>

                    {/* Text Section */}
                    <motion.div
                        variants={fadeIn("right", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.7 }}
                        className="text-center sm:text-left lg:justify-end order-3 sm:order-2">
                        {/* Date - Shown normally on larger screens */}
                        <p className="hidden sm:block font-regular mb-5 mt-10 text-sm sm:text-lg">
                            01-01-2025
                        </p>

                        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-4">
                            ចំណេះដឹងអប់រំសុខភាពផ្ទាល់ខ្លួន
                        </h1>
                        <p className="font-regular text-[16px] sm:text-lg lg:text-xl text-gray-900 mb-6">
                            រៀនអំពីការថែទាំសុខភាពអាហារូបត្ថម្ភ និងសុខភាពផ្លូវចិត្ត ក្នុងអំឡុងពេលមានផ្ទៃពោះ
                        </p>
                        <a href="#" className="text-rose-300 text-[16px] sm:text-lg md:mb-12 font-bold inline-flex transition duration-300 hover:text-blue-300">
                            ស្វែងយល់បន្ថែម →
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="bg-gray-100 hidden lg:block overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="338px" viewBox="0 0 1440 320">
                    <path fill="#ffffff" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,208C1120,192,1280,128,1360,96L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                </svg>
            </div>

        </div>
    );
};

export default NewsBlog;
