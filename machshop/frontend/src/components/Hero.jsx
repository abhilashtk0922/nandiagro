import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 py-3 mt-16 shadow-md">
        <marquee className="text-2xl font-bold text-white" scrollamount="5">
          Welcome to Nandi Agrotech - Your Trusted Partner in Agriculture
          Equipment
        </marquee>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mt-10 px-4 sm:px-8">
        {/* Hero Left Side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
          <div className="text-[#414141]">
            <div className="flex items-center gap-2">
              <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
              <p className="font-medium text-sm md:text-base text-black">
                WE ASSURE
              </p>
            </div>
            <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed text-black">
              BEST PRODUCT
            </h1>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm md:text-base text-black">
                VISIT NOW
              </p>
              <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
            </div>
          </div>
        </div>
        {/* Hero Right Side */}
        <div className="w-full sm:w-1/2 flex justify-center">
          <img
            className="w-full max-w-[450px] rounded-lg shadow-lg"
            src={assets.hero}
            alt="hero"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
