import React from "react";
import { motion } from "framer-motion";
import { cardVariants, headingVariants, containerVariants } from "../../animation/AboutPage/TeamLeader";

import vine_img from "../../assets/AboutPage/member/vine_img.jpg";
import vathana_img from "../../assets/AboutPage/member/vathana_img.jpg";
import piseth_img from "../../assets/AboutPage/member/piseth_img.png";
import lyda_img from "../../assets/AboutPage/member/lyda_img.jpg";
import rith_img from "../../assets/AboutPage/member/rith_img.jpg";
import fang_img from "../../assets/AboutPage/member/fang_img.jpg";

// Team Leader Card Component
const TeamLeader = ({ image, name, title, direction }) => {
  return (
    <motion.div
      className="flex flex-col items-center p-4 bg-white shadow-lg rounded-xl w-40 md:w-64 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      custom={direction}
    >
      {/* Team Leader Image */}
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gray-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-300 transition-all duration-300">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform transition-all duration-300 hover:scale-110"
        />
      </div>
      {/* Team Leader Info */}
      <h3 className="mt-3 text-lg md:text-xl font-bold text-gray-800">{name}</h3>
      <p className="text-gray-500 text-sm md:text-base mt-1">{title}</p>
    </motion.div>
  );
};

// Team Page Layout
const TeamPage = () => {
  const leaders = [
    { id: 1, image: fang_img, name: "ហ៊ួរ លីវហួង", title: "Project Manager" },
    { id: 2, image: lyda_img, name: "ម៉ម លីដា", title: "Data Analyst" },
    { id: 3, image: piseth_img, name: "មាន ពិសិត", title: "Data Scientist" },
    { id: 4, image: vine_img, name: "ជឹម​ វីណេ", title: "Web Developer" },
    { id: 5, image: rith_img, name: "ចន្ទរយ​ ចន្ទតារាឫទ្ធិ", title: "Web Developer" },
    { id: 6, image: vathana_img, name: "ជត​ សិរីវឌ្ឍនា", title: "Web Developer" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Animated Heading */}
      <motion.h1
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-10"
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        ក្រុមការងារ
      </motion.h1>

      {/* Animated Container for Team Cards */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {leaders.map((leader, index) => (
          <TeamLeader
            key={leader.id}
            {...leader}
            direction={index < 3 ? "left" : "right"} // First 3 from left, next 3 from right
          />
        ))}
      </motion.div>
    </div>
  );
};

export default TeamPage;
