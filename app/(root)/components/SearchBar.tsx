"use client";
import { Search } from "lucide-react";
import React from "react";
import { TypeAnimation } from "react-type-animation";

const SearchBar = () => {
  return (
    <div className="w-full flex flex-col items-center py-20">
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          "What do you want to prepare with us?",
          1000, // wait 1s before replacing "Mice" with "Hamsters"
          "Fanncy dinner ?",
          1000,
          "party sancks ?",
          1000,
          "Maybe, family meal ?",
          1000,
          "We have everything you need!",
          1000,
        ]}
        wrapper="span"
        speed={50}
        style={{
          fontSize: "2.5em",
          display: "inline-block",
          color: "orange",
          fontWeight: "bold",
        }}
        repeat={Infinity}
      />
      <div className="relative  mt-8 w-full max-w-[1000px]">
        <input
          type="text"
          placeholder="Enter the name of the dish"
          className="h-16 w-full rounded-md pl-5 text-xl shadow-md outline-none bg-white placeholder-gray-600"
        />
        <button className="absolute right-5 top-1/2 translate-y-[-50%]">
          <Search width={30} height={30} color="gray" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
