import React, { useState } from "react";

import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="flex justify-between items-center py-4 px-6 max-w-6xl mx-auto">
        <Link to="/" >
        <h1 className="text-2xl font-bold text-gray-800">Bounce</h1>
        </Link>
        {/* Hamburger Menu Icon for Mobile */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-6 items-center">
          {["Top cities", "Become a Partner", "FAQ", "Review", "Blog"].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                {link}
              </a>
            )
          )}
        </div>

        {/* Currency and Language Select */}
        <div className="hidden md:flex gap-4 items-center">
          
          <div className="flex px-4 gap-1">
            <img
              className="w-5 h-5"
              src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
              alt="Currency Icon"
            />
            { 
              <Link to='/accountConfig'>Dashboard</Link>
            }
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-white shadow-md`}
      >
        <div className="flex flex-col gap-4 p-6">
          {["Top cities", "Become a Partner", "FAQ", "Review", "Blog"].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                {link}
              </a>
            )
          )}
          <div className="mt-4 flex flex-col gap-4">
            
            <div className="py-2">
              <p className="font-semibold mb-6 text-xl">Account Information</p>

              <div className="flex gap-2">
                <img
                  className="w-5 h-5"
                  src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
                  alt="Currency Icon"
                />
                { 
                  <Link to='/accountConfig'><p className="text-sm">Dashboard</p></Link> 
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
