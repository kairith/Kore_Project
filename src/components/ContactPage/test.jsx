import React from "react";
import img from "../../assets/images/image.png"; // Ensure the path is correct
import { FaPhone, FaTelegram } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Image Section with Overlay Cards */}
      <div className="relative h-[450px] w-full overflow-hidden">
        {/* Image */}
        <img
          src={img}
          alt="Contact Us"
          className="w-full h-full object-cover object-center"
        />

        {/* Overlay Contact Cards */}
        <div className="absolute inset-0 flex flex-col md:flex-row justify-center items-center gap-8  bg-opacity-50">
          {/* Phone Card */}
          <div className="w-full md:w-[370px] h-[250px] bg-red-500 flex flex-col items-center justify-center rounded-xl shadow-lg transform transition-transform hover:scale-105">
            <FaPhone className="text-white text-5xl mb-4" />
            <p className="text-white text-lg font-semibold">Call Us</p>
            <span className="text-white text-sm mt-2">+855 884 834 024</span>
          </div>

          {/* Telegram Card */}
          <div className="w-full md:w-[370px] h-[250px] bg-blue-500 flex flex-col items-center justify-center rounded-xl shadow-lg transform transition-transform hover:scale-105">
            <FaTelegram className="text-white text-5xl mb-4" />
            <p className="text-white text-lg font-semibold">Message Us</p>
            <button className="bg-white text-blue-500 px-6 py-2 rounded-full mt-4 hover:bg-gray-100 transition-colors cursor-pointer">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;