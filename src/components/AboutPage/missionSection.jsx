import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import Main_About from "../../assets/AboutPage/main-about.jpg";

const MissionSection = () => {
    return (
        <div className="relative py-24 bg-sky-200">
            <div className="container mx-auto px-6 py-16 md:py-15 sm:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

                {/* Left Section */}
                <motion.div
                    variants={fadeIn("right", 0.3)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.7 }}
                    className="text-center sm:text-left self-start"
                >
                    <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-4 ">
                        យើងកំពុងផ្លាស់ប្តូរវិធីដែលមនុស្សគិតអំពីការថែរក្សាសុខភាពក្នុងអំឡុងពេលមានផ្ទៃពោះ
                    </h1>
                    <p className="font-regular text-[16px] sm:text-lg lg:text-xl text-gray-900 mb-6">
                        យើងគឺជាវេទិកាឌីជីថលដែលបង្កើតឡើងដើម្បីជួយស្ត្រីមានផ្ទៃពោះនៅកម្ពុជា។ យើងផ្តល់ព័ត៌មានសុខភាព, ការគាំទ្រផ្លូវអារម្មណ៍, និងជំនួយដោយ AI ជាភាសាខ្មែរ។ គោលដៅរបស់យើងគឺធានាថាមាតានពោះទាំងអស់ មានដំណោះស្រាយសម្រាប់បញ្ហារបស់ពួកគេ ហើយអាចធ្វើការសម្រេចចិត្តដោយមានព័ត៌មានគ្រប់គ្រាន់សម្រាប់ខ្លួន និងទារក។
                    </p>
                    <a href="http://localhost:5173/%E1%9E%80%E1%9E%B6%E1%9E%9A%E1%9E%A2%E1%9E%94%E1%9F%8B%E1%9E%9A%E1%9F%86/%E1%9E%A2%E1%9E%8F%E1%9F%92%E1%9E%8F%E1%9E%94%E1%9E%91" className="text-rose-300 text-[16px] sm:text-lg md:mb-14 mb-14 font-bold inline-flex transition duration-300 hover:text-white">
                        ស្វែងយល់បន្ថែម →
                    </a>
                </motion.div>

                {/* Right Section - Image */}
                <motion.div
                    variants={fadeIn("left", 0.3)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.7 }}
                    className="flex justify-center lg:justify-end"
                >
                    <img
                        src={Main_About} // Make sure you imported the correct image
                        alt="Hero Illustration"
                        className="w-full max-w-[500px] h-[340px] object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:shadow-sky-300"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default MissionSection;
