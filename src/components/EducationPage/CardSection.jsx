import React from "react";
import content1 from "../../assets/EducationPage/content1.jpg";
import content2 from "../../assets/EducationPage/content2.jpg";
import content3 from "../../assets/EducationPage/content3.jpg";
import { motion } from "framer-motion";
import { fadeIn } from "../variants"

const CardSection = () => {
  // Card Data
  const cards = [
    {
      id: 1,
      image: content1,
      title: "តើអ្នកអាចហាត់ប្រាណក្នុងអំឡុងពេលមានផ្ទៃពោះបានទេ?",
      description:
        "ការហាត់ប្រាណពេលមានផ្ទៃពោះគឺមានសុវត្ថិភាព និងសុខភាពល្អសម្រាប់អ្នក និងទារករបស់អ្នក នេះជាអ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវដឹង...",
    },
    {
      id: 2,
      image: content2,
      title: "ហេតុអ្វីបានជាអ្នកប្រើអាស៊ីតហ្វូលិកក្នុងពេលមានផ្ទៃពោះ?",
      description:
        "ក្នុងអំឡុងពេល 12 សប្តាហ៍ដំបូងនៃការមានផ្ទៃពោះ ឆ្អឹងខ្នង និងខួរក្បាលរបស់ទារកកំពុងអភិវឌ្ឍ។ ការទទួលបានអាស៊ីតហ្វូលិកគ្រប់គ្រាន់ពេញមួយពេលមានផ្ទៃពោះ...",
    },
    {
      id: 3,
      image: content3,
      title: "ការទទួលទានវីតាមីនចម្រុះកំឡុងពេលមានផ្ទៃពោះ",
      description:
        "អាហារូបត្ថម្ភល្អក្នុងអំឡុងពេលមានផ្ទៃពោះមានសារៈសំខាន់សម្រាប់ការអភិវឌ្ឍសុខភាពរបស់ទារករបស់អ្នក។ វិធីមួយក្នុងចំណោមវិធីដើម្បីធ្វើនោះគឺការទទួលទានវីតាមីនចម្រុះ...",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-white mt-5 pt-14 pb-40 md:pb-4">
      {/* Title Section */}
      <div
        className="text-center mb-12 sm:mb-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">អត្ថបទ​ និង វីដេអូសុខភាព</h1>
      </div>

      {/* Responsive Card Grid */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={fadeIn("left", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.7 }}
              // 'group' allows child elements to respond to the parent's hover state
              className="group bg-gray-100 rounded-xl overflow-hidden 
                         transition-transform transform 
                         w-[90%] sm:w-full sm:max-w-xs md:max-w-sm lg:max-w-md h-auto mx-auto p-4 sm:p-6 
                         cursor-pointer duration-300 hover:scale-105 hover:bg-blue-300 hover:shadow-2xl"
            >
              {/* Image Wrapper for Centering */}
              <div className="w-full flex justify-center">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-[180px] sm:w-[220px] md:w-[240px] lg:w-[260px] h-auto mt-4 object-cover rounded-lg"
                />
              </div>

              {/* Card Content */}
              <div className="p-3 sm:p-6 text-center">
                {/* Base color is text-gray-800; turns white on hover */}
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 group-hover:text-white">
                  {card.title}
                </h3>
                {/* Base color is text-gray-600; turns white on hover */}
                <p className="font-regular text-gray-600 text-sm mb-4 group-hover:text-white">
                  {card.description}
                </p>
                <div className="text-center">
                  {/* Base color is text-blue-500; turns white on hover */}
                  <a
                    href="#"
                    className="font-regular text-blue-500 inline-flex items-center group-hover:text-white"
                  >
                    <span className="lg:mt-5">ស្វែងយល់បន្ថែម</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fillOpacity="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 ml-2 lg:mt-5 group-hover:text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5l6 6m0 0l-6 6m6-6H4.5"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CardSection;
