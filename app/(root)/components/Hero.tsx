import React from "react";
import Image from "next/image";
import hero from "../../../public/images/hero.png";

const Hero = () => {
  return (
    <div className="w-full relative">
      <Image src={hero} alt="hero" height={600} />
      <div className="absolute w-full h-[596px] bg-black opacity-65 top-0"></div>
      <p className="absolute flex flex-col top-1/2 translate-y-[-50%] pl-24 ">
        <span className="text-white text-[100px] font-bold h-[120px]">
          The largest
        </span>
        <span className="text-white text-[100px] font-bold h-[120px]">
          library of
        </span>
        <span className=" text-main text-[100px] font-bold h-[120px]">
          recipes
        </span>
      </p>
    </div>
  );
};

export default Hero;
