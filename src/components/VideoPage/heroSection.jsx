import React from "react";
import { motion } from "framer-motion";
import { textAnimation, headingAnimation } from "../../animation/videoPage/heroSection";
import video1 from "../../assets/VideoPage/video1.jpg"

const HeroSection = () => {
  return (
    <div className="relative container mx-auto flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${video1})` }}>
      {/* Brightness Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Text Section with Animation */}
      <motion.div
        className="relative flex flex-col items-center text-center z-10"
        initial={textAnimation.initial}
        animate={textAnimation.animate}
        transition={textAnimation.transition}
      >
        <motion.h1
          className="font-bold text-4xl md:text-5xl mb-4 text-blue-500 md:mb-10"
          initial={headingAnimation(0.3).initial}
          animate={headingAnimation(0.3).animate}
          transition={headingAnimation(0.3).transition}
        >
          វីដេអូស្តីអំពីចំណេះដឹងសម្រាប់
        </motion.h1>
        <motion.h1
          className="font-bold text-5xl md:text-7xl text-pink-500"
          initial={headingAnimation(0.6).initial}
          animate={headingAnimation(0.6).animate}
          transition={headingAnimation(0.6).transition}
        >
          ស្រ្តីមានផ្ទៃពោះ
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default HeroSection;