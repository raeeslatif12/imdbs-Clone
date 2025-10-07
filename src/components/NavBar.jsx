import React, { useState } from "react";
import { FaBars, FaSearch, FaBookmark, FaCaretDown } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <nav className="bg-black text-white font-sans">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="bg-yellow-500 text-black font-bold text-2xl px-2 py-1 rounded-md"
          >
            IMDb
          </a>
          <button className="hidden md:flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-800">
            <FaBars className="w-5 h-5" />
            <span>Menu</span>
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-800"
          >
            <FaBars className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 px-2">
          <div className="flex items-center bg-white rounded-md overflow-hidden">
            <button className="flex items-center pl-3 pr-1 border-r text-black">
              <span className="text-sm font-semibold">All</span>
              <FaCaretDown className="ml-1 w-3 h-3 text-gray-600" />
            </button>
            <input
              type="text"
              placeholder="Search IMDb"
              className="w-full pl-3 py-2 text-black focus:outline-none"
            />
            <button className="p-2 text-gray-600 hover:text-black">
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="font-bold text-blue-400 text-sm">
            IMDb<span className="font-normal text-white">Pro</span>
          </a>
          <span className="h-6 w-px bg-gray-600"></span>
          <a
            href="#"
            className="flex items-center space-x-1 hover:bg-gray-800 px-2 py-1 rounded-md"
          >
            <FaBookmark className="w-4 h-4" />
            <span>Watchlist</span>
          </a>
          <a href="#" className="hover:bg-gray-800 px-2 py-1 rounded-md">
            Sign In
          </a>
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center space-x-1 hover:bg-gray-800 px-2 py-1 rounded-md"
            >
              <span>EN</span>
              <FaCaretDown />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-gray-800 rounded-md">
                <a
                  href="#"
                  className="block px-3 py-2 hover:bg-gray-700 text-sm"
                >
                  EN
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 hover:bg-gray-700 text-sm"
                >
                  UR
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 p-4 space-y-3">
          <a href="#" className="block font-bold text-blue-400">
            IMDbPro
          </a>
          <a href="#" className="block">
            Watchlist
          </a>
          <a href="#" className="block">
            Sign In
          </a>
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center space-x-1"
          >
            <span>EN</span>
            <FaCaretDown />
          </button>
          {langOpen && (
            <div className="mt-2 bg-gray-800 rounded-md">
              <a href="#" className="block px-3 py-2 hover:bg-gray-700 text-sm">
                EN
              </a>
              <a href="#" className="block px-3 py-2 hover:bg-gray-700 text-sm">
                UR
              </a>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
