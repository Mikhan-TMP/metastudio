import { useState } from "react";
import { Tv, Type, Sparkles, ChevronDown } from "lucide-react";

const ResponsiveTabs = ({ currentView, setCurrentView }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="bg-white shadow-sm p-4 rounded-[12px]">
      {/* Dropdown for small screens */}
      <div className="sm:hidden relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="px-4 py-2 flex items-center justify-between w-full border-b-2 border-blue-600 text-blue-600"
        >
          {currentView === "tv"
            ? "TV Content"
            : currentView === "banner"
            ? "Banner"
            : "Effects"}
          <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
        </button>
        {dropdownOpen && (
          <div className="absolute left-0 w-full bg-white shadow-md rounded-md mt-1 z-10">
            <button
              onClick={() => {
                setCurrentView("tv");
                setDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              TV Content
            </button>
            <button
              onClick={() => {
                setCurrentView("banner");
                setDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              Banner
            </button>
            <button
              onClick={() => {
                setCurrentView("effect");
                setDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              Effects
            </button>
          </div>
        )}
      </div>

      {/* Button group for larger screens */}
      <div className="hidden sm:flex flex-wrap justify-center space-x-2 sm:space-x-4 md:space-x-8">
        <button
          onClick={() => setCurrentView("tv")}
          className={`px-4 py-2 flex items-center gap-2 border-b-2 transition-all duration-200 ${
            currentView === "tv"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Tv size={16} />
          <span className="hidden sm:inline">TV Content</span>
        </button>
        <button
          onClick={() => setCurrentView("banner")}
          className={`px-4 py-2 flex items-center gap-2 border-b-2 transition-all duration-200 ${
            currentView === "banner"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Type size={16} />
          <span className="hidden sm:inline">Banner</span>
        </button>
        <button
          onClick={() => setCurrentView("effect")}
          className={`px-4 py-2 flex items-center gap-2 border-b-2 transition-all duration-200 ${
            currentView === "effect"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Sparkles size={16} />
          <span className="hidden sm:inline">Effects</span>
        </button>
      </div>
    </div>
  );
};

export default ResponsiveTabs;
