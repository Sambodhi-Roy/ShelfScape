import React from "react";

const Hero = () => {
  return (
    <div className="relative bg-[#FCF5EA] min-h-screen px-6 md:px-20 py-10 overflow-hidden">
      {/* Bottom Corner Images */}
      <img
        src="/assets/left.png"
        alt="Left decoration"
        className="absolute bottom-[-10px] left-[-40px] w-[500px] md:w-[600px] opacity-100 z-0 pointer-events-none"
      />

      <img
        src="./assets/right.png"
        alt="Right decoration"
        className="absolute bottom-0 right-0 w-60 md:w-60 opacity-100 z-0 pointer-events-none"
      />

      {/* Navbar */}
      <nav className="flex justify-between items-center mb-20 relative z-10">
        <div style={{ fontFamily: "Virgil" }} className="text-2xl font-bold">
          Bookshelf
        </div>
        <ul
          style={{ fontFamily: "Virgil" }}
          className="hidden md:flex space-x-10 text-sm font-medium"
        >
          <li className="hover-link text-[20px] hover:cursor-pointer">Home</li>
          <li className="hover-link text-[20px] hover:cursor-pointer">About</li>
          <li className="hover-link text-[20px] hover:cursor-pointer">Books</li>
        </ul>
        <button className="bg-accent hover:bg-accent-dark text-white font-semibold py-2 px-6 rounded-xl">
          Join Now
        </button>
      </nav>

      {/* Hero Content */}
      <div className="text-center mt-20 relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Where{" "}
          <span style={{ fontFamily: "Virgil" }} className="text-accent">
            books
          </span>{" "}
          find people — and people find their{" "}
          <span style={{ fontFamily: "Virgil" }} className="text-accent">
            kind.
          </span>
        </h1>
        <p className="text-gray-300 mt-6 text-lg md:text-xl text-accent">
          Track your reads. Get scary-good recommendations. Join book clubs.
          Talk lit all day.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex justify-center space-x-6">
          <button className="bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-8 rounded-xl shadow-lg">
            Get Started
          </button>
          <button className="bg-gray-800 hover:bg-accent-dark text-white font-semibold py-3 px-8 rounded-xl shadow-lg">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
