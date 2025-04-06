import React from "react";
import img from "../../assets/ContactPage/image.png"; // Ensure the path is correct
import { FaPhone, FaTelegram } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="bg-gray-100 h-[700px]">
      {/* Image Section with Overlay Cards */}
      <div className="relative h-[540px] md:h-[450px] w-full mt-20">
        {/* Image */}
        <img
          src={img}
          alt="Contact Us"
          className="w-full h-full object-cover object-center"
        />

        {/* Overlay Contact Cards */}
        <div className="absolute cursor-pointer inset-0 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mt-[30px] md:mt-[450px] z-10 px-4">
          {/* Phone Card */}
          <div className="w-full max-w-[280px] md:max-w-[370px] h-[150px] md:h-[250px] bg-pink-400 flex flex-col items-center justify-center rounded-xl shadow-lg duration-200 transform transition-transform hover:scale-105">
            <FaPhone className="text-white text-2xl sm:text-3xl lg:text-4xl mb-2 md:mb-4" />
            <p className="text-white text-sm md:text-lg font-bold text-center">
              ទាក់ទងមកកាន់ពួកយើង
            </p>
            <span className="text-white text-base md:text-xl mt-1 md:mt-2">
              +855 884 834 024
            </span>
          </div>

          {/* Telegram Card */}
          <div className="w-full max-w-[280px] md:max-w-[370px] h-[150px] md:h-[250px] bg-blue-400 flex flex-col items-center justify-center rounded-xl shadow-lg duration-200 transform transition-transform hover:scale-105">
            <FaTelegram className="text-white text-2xl sm:text-3xl lg:text-5xl mb-2 md:mb-4" />
            <p className="text-white text-sm md:text-lg font-bold text-center">
              ទាក់ទងសម្រាប់ការជួយគាំទ្រ
            </p>
            <button className="font-regular bg-white text-blue-500 px-4 md:px-8 py-1 md:py-2 rounded-xl mt-2 md:mt-4 duration-200 transition hover:bg-gray-200 text-sm md:text-base cursor-pointer">
              ទាក់ទង
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;