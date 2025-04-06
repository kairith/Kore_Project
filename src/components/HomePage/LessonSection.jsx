import React from "react";
import Interest1 from "../../assets/HomePage/Interest1.jpg";
import Interest2 from "../../assets/HomePage/Interest2.jpg";
import Interest3 from "../../assets/HomePage/Interest3.jpg";
import { motion } from "framer-motion";
import { fadeIn } from "../variants.js"

const LessonSection = () => {
    const LessonCards = [
        {
            id: 1,
            title: "ការណែនាំអំពីអ្វីដែលត្រូវញ៉ាំអំឡុងពេលមានផ្ទៃពោះ",
            description: "ខណៈពេលដែលអ្នកមានផ្ទៃពោះ អ្នកនឹងចង់ញ៉ាំប្រូតេអ៊ីនបន្ថែម កាល់ស្យូម ជាតិដែក និងវីតាមីនសំខាន់ៗ។",
            bgColor: "bg-blue-400", // First Card Color
            textColor: "text-white",
        },
        {
            id: 2,
            title: "មានរបបអាហារដែលមានសុខភាពល្អក្នុងពេលមានផ្ទៃពោះ",
            description: "របបអាហារដែលមានសុខភាពល្អគឺជាផ្នែកមួយដ៏សំខាន់នៃរបៀបរស់នៅដែលមានសុខភាពល្អគ្រប់ពេល ប៉ុន្តែមានសារៈសំខាន់ជាពិសេសប្រសិនបើអ្នកមានផ្ទៃពោះ ឬមានគម្រោងមានផ្ទៃពោះ។ ",
            bgColor: "bg-pink-300", // Second Card Color
            textColor: "text-white",
        },
    ];

    const bottomcards = [
        {
            id: 1,
            image: Interest1,
            description: "ការមានផ្ទៃពោះគឺជាពេលវេលានៃការផ្លាស់ប្តូររាងកាយ និងអារម្មណ៍យ៉ាងជ្រាលជ្រៅ។",
        },
        {
            id: 2,
            image: Interest2,
            description: "អ្នកប្រហែលជាធ្លាប់លឺម្តាយផ្សេងទៀតដែលធ្លាប់ឆ្លងកាត់ការសម្រាលកូននិយាយអំពីអត្ថប្រយោជន៍នៃការសម្រាលកូន។ ប៉ុន្តែ​អ្វី​ទៅ​ជា hypnobirthing ហើយ​អ្នក​គួរ​ធ្វើ​វា?",
        },
        {
            id: 3,
            image: Interest3,
            description: "ការមានផ្ទៃពោះគឺជាពេលវេលានៃការផ្លាស់ប្តូររាងកាយ និងអារម្មណ៍យ៉ាងជ្រាលជ្រៅ។",
        },
    ];

    return (
        <div className="relative">
            {/* Lesson Cards Section */}
            <div className="bg-gray-100 py-30 px-10">
                {/* Title Section */}
                <div className="max-w-7xl mx-auto">
                    <h1
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
                        អត្ថបទ
                    </h1>

                    {/* Lesson Cards Grid */}
                    <div className="flex justify-between gap-x-10">
                        {LessonCards.map((lessonCard) => (
                            <motion.div
                                variants={fadeIn("up", 0.3)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{ once: true, amount: 0.7 }}
                                key={lessonCard.id}
                                className={`${lessonCard.bgColor} ${lessonCard.textColor} shadow-md rounded-xl w-[48%] p-6 flex flex-col justify-center transition-transform duration-300 hover:shadow-2xl hover:scale-105`}
                            >
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">{lessonCard.title}</h3>
                                <p className="font-regular mt-2 text-sm lg:text-lg sm:text-base opacity-90">
                                    {lessonCard.description}
                                </p>
                                <div className="mt-4">
                                    <a href="#" className="font-regular text-sm sm:text-lg inline-flex items-center text-white hover:text-blue-500">
                                        ស្វែងយល់បន្ថែម →
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Wave */}
                <div className="absolute left-0 w-full hidden md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f3f4f6" fill-opacity="1" d="M0,160L48,149.3C96,139,192,117,288,122.7C384,128,480,160,576,170.7C672,181,768,171,864,154.7C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
                </div>
            </div>

            {/* Bottom Cards Section */}
            <div className="bg-white py-30 px-10 cursor-pointer">
                {/* Title Section */}
                <div className="max-w-7xl mx-auto justify-start mt-5">
                    <h1
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
                        អត្ថបទ
                    </h1>

                    {/* Bottom Cards Grid - NOW GRID WITH 1 COLUMN ON PHONE, 3 ON DESKTOP */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {bottomcards.map((card) => (
                            <motion.div
                                variants={fadeIn("right", 0.3)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{ once: true, amount: 0.7 }}
                                key={card.id}
                                className="w-full transition-transform duration-300 transform"
                            >
                                {/* Image Section */}
                                <div className="w-full flex justify-center p-4">
                                    <img
                                        src={card.image}
                                        alt="Pregnancy Care"
                                        className="w-full h-[250px] md:h-[300px] object-cover rounded-lg"
                                    />
                                </div>

                                {/* Text Section */}
                                <div className="p-4 text-center">
                                    <p className="font-regular text-gray-600 text-sm leading-relaxed">
                                        {card.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonSection;
