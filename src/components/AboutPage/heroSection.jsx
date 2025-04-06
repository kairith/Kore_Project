import React from 'react';
import Card1 from '../../assets/AboutPage/Card1s.jpg'; // Adjust the path based on your structure

const HeroSection = () => {
  return (
    <div className="flex-1 flex justify-center items-center mt-18">
        <img src={Card1} alt="About Us" className="w-full h-158 object-cover" />
    </div>
  );
};

export default HeroSection;
