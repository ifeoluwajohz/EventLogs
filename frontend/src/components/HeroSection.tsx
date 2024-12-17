import React from "react";
import {Link} from 'react-router-dom'

const HeroSection: React.FC = () => {
  return (
    <div className=" h-full py-8 mb-10 flex flex-col items-center px-4">

      {/* Hero Section Content */}
      <div className="text-center mt-10 md:mt-20">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
          Find and Book Events Near You
        </h2>
        <p className="text-gray-600 mt-4 md:text-base text-sm">
          Discover amazing events in your city! Instantly book tickets for concerts, <br />
          workshops, and more, and create unforgettable memories.
        </p>


        {/* Search Bar */}
        <div className="flex flex-col md:flex-row mt-6 gap-4 justify-center items-center">
          <input
            type="text"
            placeholder="Location here"
            className="border border-gray-300 px-4 py-3 rounded-lg w-full md:w-72 focus:outline-none"
          />
          <input
            type="date"
            className="border border-gray-300 px-4 py-3 rounded-lg w-full md:w-44 focus:outline-none"
          />
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 w-full md:w-36">
            <span className="text-gray-600 mr-2">1</span>
            <span>▼</span>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full md:w-auto hover:bg-blue-700">
            Search
          </button>
        </div>

        {/* Near Me Button */}
        <div className="mt-4">
          <Link to='/accountconfig'>
          <button className="text-blue-600 hover:underline">📍 Near me</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
