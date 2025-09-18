import React, { useState } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";

import { Link } from "react-router-dom";
import { ArrowBigRightDash } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  // const navigate =

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="flex justify-between items-center py-4 px-6 max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="lg:text-2xl text-xl font-bold text-gray-800">Tickets Hub</h1>
        </Link>
        {/* Hamburger Menu Icon for Mobile */}
        <button
          className="lg:hidden text-gray-800 focus:outline-none"
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
        <div className="hidden lg:flex gap-4 items-center">
          {[
            "Top cities",
            "Find a event",
            "Create An Event",
            "Faq",
            "Blogs",
          ].map((link) => (
            <Link
              key={link}
              to={`/${link}`}
              className="text-gray-600 lg:text-base text-sm transition-colors hover:text-gray-800 hover:underline  "
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Currency and Language Select */}
        <div className="hidden lg:flex gap-4 items-center">
          <div className="flex px-4 gap-1">
            <SignedIn>
              <div className="flex justify-center items-center gap-x-2">
                <UserButton />
                <p className="text-gray-600 text-base underline">
                  {user?.firstName}
                </p>
              </div>

              {/* <p>Dashboard</p> */}
            </SignedIn>
            <SignedOut>
              <div className="flex items-center lg:gap-x-5 gap-x-2 justify-center">
                <p
                  className="text-gray-600 text-sm underline font-medium cursor-pointer"
                  onClick={() => openSignIn()}
                >
                  Sign In
                </p>
                <div className="flex">
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm flex items-center gap-x-2 font-medium">
                    Start Booking
                    <ArrowBigRightDash className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } lg:hidden bg-white shadow-md`}
      >
        <div className="flex flex-col gap-4 p-6">
          {[
            "Top cities",
            "Find a event",
            "Create An Event",
            "Faq",
            "Blogs",
          ].map((link) => (
            <Link
              key={link}
              to={`/${link}`}
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              {link}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-4">
            <div className="py-2">
              <p className="font-semibold mb-6 text-xl">Account Information</p>

              {/* // <Link to="/accountConfig">
                  //   <p className="text-sm">Dashboard</p>
                  // </Link> */}
              <>
                <SignedIn>
                  <UserButton />
                  <p className="text-black">{user?.fullName}</p>
                  {/* <p>Dashboard</p> */}
                </SignedIn>
                <SignedOut>
                  <div className="flex flex-col items-start gap-y-4 justify-center">
                    <p
                      className="text-gray-600 text-sm underline font-medium cursor-pointer"
                      onClick={() => openSignIn()}
                    >
                      Sign In
                    </p>
                    <div className="flex">
                      <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm flex items-center gap-x-2 font-medium">
                        Start Booking
                        <ArrowBigRightDash className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </SignedOut>
              </>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
