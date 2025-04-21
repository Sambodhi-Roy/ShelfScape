import React from "react";

const OnboardingCard = ({ name, img, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-[120px] cursor-pointer rounded-xl overflow-hidden shadow-md transition-all duration-300 transform ${
        selected ? "ring-4 ring-blue-500 scale-105" : "hover:scale-105"
      }`}
    >
      <div className="relative w-full aspect-square">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover brightness-90"
        />
        {selected && (
          <div className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
            Selected
          </div>
        )}
      </div>
      <div className="text-center text-sm font-medium py-1">{name}</div>
    </div>
  );
};

export default OnboardingCard;
