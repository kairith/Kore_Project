import React from "react";
import { motion } from "framer-motion";
import Card1 from "../../assets/HomePage/Card1.jpg";
import Card2 from "../../assets/HomePage/Card2.jpg";
import Card3 from "../../assets/HomePage/Card3.jpg";
import { fadeIn } from "../variants"

const CardSection = () => {
  // Card Data
  const cards = [
    {
      id: 1,
      image: Card1,
      title: "អ្វីដែលត្រូវញ៉ាំនៅពេលមានផ្ទៃពោះ",
      description:
        "ផ្តល់ការពិគ្រោះយោបល់អំពីរបបអាហារដែលសមស្របសម្រាប់សុខភាពរបស់ម្តាយនិងទារករបស់លោកអ្នក។",
    },
    {
      id: 2,
      image: Card2,
      title: "ការគ្រប់គ្រង់អារម្មណ៍",
      description:
        "ផ្តល់ការពិគ្រោះអំពីការរៀបចំចិត្តនិងការងារទាក់ទងផ្សេងៗដែលត្រូវត្រៀមរៀបចំ។",
    },
    {
      id: 3,
      image: Card3,
      title: "អត្ថប្រយោជន៍នៃយូហ្គាអំឡុងពេលមានផ្ទៃពោះ",
      description:
        "ការមានផ្ទៃពោះគឺជាពេលវេលានៃការផ្លាស់ប្តូររាងកាយ និងអារម្មណ៍យ៉ាងជ្រាលជ្រៅ។",
    },
  ];

  return (
    <div className="bg-gray-100 pt-16 pb-16">
      {/* Title Section */}
      <div
        className="text-center mb-12 sm:mb-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          អត្ថបទ
        </h1>
      </div>

      {/* Responsive Card Grid */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={fadeIn("left", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.7 }}
              className="group bg-white shadow-md rounded-xl overflow-hidden 
                         transition-transform transform
                         w-[90%] sm:w-full sm:max-w-xs md:max-w-sm lg:max-w-md h-auto mx-auto p-4 sm:p-6 
                         cursor-pointer duration-300 hover:scale-105 hover:bg-blue-300 hover:shadow-lg hover:shadow-blue-200"
            >
              {/* Image Wrapper for Centering */}
              <div className="w-full flex justify-center">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-[180px] sm:w-[220px] md:w-[240px] lg:w-[260px] h-auto mt-4 rounded-lg object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-3 sm:p-6 text-center">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 group-hover:text-white">
                  {card.title}
                </h3>
                <p className="font-regular text-gray-600 text-sm mb-4 group-hover:text-white">
                  {card.description}
                </p>
                <div className="text-center">
                  <a
                    href="#"
                    className="font-regular text-blue-500 inline-flex items-center group-hover:text-white"
                  >
                    <span className="lg:mt-5"><a href="http://localhost:5173/%E1%9E%80%E1%9E%B6%E1%9E%9A%E1%9E%A2%E1%9E%94%E1%9F%8B%E1%9E%9A%E1%9F%86/%E1%9E%A2%E1%9E%8F%E1%9F%92%E1%9E%8F%E1%9E%94%E1%9E%91">ស្វែងយល់បន្ថែម</a></span>
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
        </div>
      </div>
    </div>
  );
};

export default CardSection;
