import React, { useState } from "react";
import OnboardingCard from "../components/OnboardingCard";
import { useNavigate } from "react-router-dom";

const genres = [
  { name: "Fantasy", img: "/assets/fantasy-genre.jpg" },
  { name: "Science Fiction", img: "/assets/scifi-genre.jpg" },
  { name: "Romance", img: "/assets/romance-genre.jpg" },
  { name: "Mystery", img: "/assets/mystery-genre.jpg" },
  { name: "Thriller", img: "/assets/thriller.jpg" },
  { name: "Horror", img: "/assets/horror-genre.jpg" },
  { name: "Hystorical Fiction", img: "/assets/hystorical-fiction-genre.jpg" },
  { name: "Young Adult", img: "/assets/young-adult-genre.jpg" },
  { name: "Drama", img: "/assets/drama-genre.jpg" },
  { name: "Adventure", img: "/assets/adventure-genre.jpg" },
  { name: "Non-Fiction", img: "/assets/non-fiction-genre.jpg" },
  { name: "Biography and Memoir", img: "/assets/biography-genre.jpg" },
  { name: "Self-Help", img: "/assets/self-help-genre.jpg" },
  { name: "Poetry", img: "/assets/poetry-genre.jpg" },
  { name: "Comics & Graphic Novels", img: "/assets/comic-genre.jpg" },
  { name: "Philosophy & Spirituality", img: "/assets/philosophy-genre.jpg" },
];

const GenreSelector = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };
  navigate('/auther')

  return (
    <div className="bg-[#FCF5EA] min-h-screen pb-8 px-8">
      <div className="flex flex-col items-center justify-start pt-10">
        <h2 style={{ fontFamily: "Virgil" }} className="text-3xl p-4 mb-2">
          What are your favourite genres?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-8">
          {genres.map((genre) => (
            <OnboardingCard
              key={genre.name}
              name={genre.name}
              img={genre.img}
              selected={selectedGenres.includes(genre.name)}
              onClick={() => toggleGenre(genre.name)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-2 pr-16">
        <button className="px-6 py-2 text-sm font-medium rounded-xl bg-white border border-gray-300 shadow-sm hover:bg-gray-100 transition">
          Skip
        </button>
        <button className="px-6 py-2 text-sm font-medium rounded-xl bg-[#4c59bd] text-white shadow-md hover:bg-[#3b48a1] transition">
          Next
        </button>
      </div>
    </div>
  );
};

export default GenreSelector;
