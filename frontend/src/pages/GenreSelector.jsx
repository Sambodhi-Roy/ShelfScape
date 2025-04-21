import React from "react";

const genres = [
  { name: "Fantasy", img: "/assets/fantasy-genre.jpg" },
  { name: "Science Fiction", img: "/assets/fantasy-genre.jpg" },
  { name: "Romance", img: "/assets/fantasy-genre.jpg" },
  { name: "Mystery", img: "/assets/fantasy-genre.jpg" },
  { name: "Thriller", img: "/assets/fantasy-genre.jpg" },
  { name: "Horror", img: "/assets/fantasy-genre.jpg" },
  { name: "Hystorical Fiction", img: "/assets/fantasy-genre.jpg" },
  { name: "Young Adult", img: "/assets/fantasy-genre.jpg" },
  { name: "Drama", img: "/assets/fantasy-genre.jpg" },
  { name: "Adventure", img: "/assets/fantasy-genre.jpg" },
  { name: "Non-Fiction", img: "/assets/fantasy-genre.jpg" },
  { name: "Biography and Memoir", img: "/assets/fantasy-genre.jpg" },
  { name: "Self-Help", img: "/assets/fantasy-genre.jpg" },
  { name: "Poetry", img: "/assets/fantasy-genre.jpg" },
  { name: "Comics & Graphic Novels", img: "/assets/fantasy-genre.jpg" },
  { name: "Philosophy & Spirituality", img: "/assets/fantasy-genre.jpg" },
];

const GenreSelector = () => {
  return (
    <div className="h-screen pt-30 flex bg-[#FCF5EA] flex-col items-center justify-start">
      <h2 style={{ fontFamily: "Virgil" }} className="text-3xl">
        What are your favourite genres?
      </h2>
      <div className="flex flex-wrap gap-6 p-6 justify-start"></div>
    </div>
  );
};

export default GenreSelector;
