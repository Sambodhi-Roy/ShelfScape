import React, { useState } from "react";
import OnboardingCard from "../components/OnboardingCard";
import { useNavigate } from "react-router-dom";

const authors = [
  {
    name: "Stephen King",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Stephen_King_at_the_2024_Toronto_International_Film_Festival_2_%28cropped%29.jpg/512px-Stephen_King_at_the_2024_Toronto_International_Film_Festival_2_%28cropped%29.jpg",
  },
  {
    name: "Nora Roberts",
    img: "https://images.gr-assets.com/authors/1505847251p5/625.jpg",
  },
  {
    name: "John Grisham",
    img: "https://innocenceproject.org/wp-content/uploads/2023/03/JohnGrishamPhotoREV-1-1.jpg",
  },
  {
    name: "James Patterson",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/12/James_Patterson_at_the_Library_of_Congress_National_Book_Festival_on_August_24,_2024_(cropped).jpg",
  },
  {
    name: "Mary Higgins Clark",
    img: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Mary_Higgins_Clark_at_the_Mazza_Museum.jpg",
  },
  {
    name: "Dean R. Koontz",
    img: "https://images.gr-assets.com/authors/1361935587p5/6926240.jpg",
  },
  {
    name: "Tom Clancy",
    img: "https://static.thriftbooks.com/author_images/198108.jpg",
  },
  {
    name: "Danielle Steel",
    img: "https://cdn.britannica.com/57/269357-050-9ABEC060/author-Danielle-Steel-1996.jpg?w=400&h=300&c=crop",
  },
  {
    name: "Sue Grafton",
    img: "https://static.thriftbooks.com/author_images/196842.jpg",
  },
  {
    name: "Janet Evanovich",
    img: "https://images.gr-assets.com/authors/1478729372p5/2384.jpg",
  },
  {
    name: "Anne Rice",
    img: "https://static.thriftbooks.com/author_images/196988.jpg",
  },
  {
    name: "Michael Crichton",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/af/MichaelCrichton_2.jpg",
  },
  {
    name: "J. K. Rowling",
    img: "https://d.newsweek.com/en/full/2628224/jk-rowling.jpg?w=1200&f=c39d676227d59d446198ca9b95eb81b1",
  },
  {
    name: "V.C. Andrews",
    img: "https://m.media-amazon.com/images/M/MV5BNDMxNGJhNTUtNWFiOC00ODE4LTkxYTYtZWRmYmM2YWQ4NDllXkEyXkFqcGc@.jpg",
  },
  {
    name: "Sandra Brown",
    img: "https://jathanandheather.com/wp-content/uploads/2022/02/sandra-brown-photo-by-ryan-m-brown-photography-1.jpg?w=829",
  },
  {
    name: "Nicholas Sparks",
    img: "https://m.media-amazon.com/images/M/MV5BMTA3NjQxOTc2ODReQTJeQWpwZ15BbWU3MDMxODY4Njc@.jpg",
  },
  {
    name: "R. L. Stine",
    img: "https://m.media-amazon.com/images/M/MV5BNjhjNWU0NjEtZjdhNC00MjNmLWE5NGEtMTYwNzQyMGZhZDRmXkEyXkFqcGc@.jpg",
  },
  {
    name: "Rich Shapero",
    img: "https://m.media-amazon.com/images/S/amzn-author-media-prod/s7ln8rntujjneuim7ig9s7tv5k._SX450_.jpg",
  },
  {
    name: "Patricia Daniels Cornwell",
    img: "https://static.thriftbooks.com/author_images/196448.jpg",
  },
];

const AuthorSelector = () => {
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const navigate = useNavigate();

  const toggleAuthor = (authorName) => {
    setSelectedAuthors((prev) =>
      prev.includes(authorName)
        ? prev.filter((name) => name !== authorName)
        : [...prev, authorName]
    );
  };

  return (
    <div className="bg-[#FCF5EA] min-h-screen pb-8 px-8">
      <div className="flex flex-col items-center justify-start pt-10">
        <h2 style={{ fontFamily: "Virgil" }} className="text-3xl p-4 mb-2">
          Who are your favorite authors?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-8">
          {authors.map((author) => (
            <OnboardingCard
              key={author.name}
              name={author.name}
              img={author.img}
              selected={selectedAuthors.includes(author.name)}
              onClick={() => toggleAuthor(author.name)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-2 pr-16">
        <button className="px-6 py-2 text-sm font-medium rounded-xl bg-white border border-gray-300 shadow-sm hover:bg-gray-100 transition">
          Skip
        </button>
        <button
        onClick={()=>(
          navigate('/dashboard')
        )}
        className="px-6 py-2 text-sm font-medium rounded-xl bg-[#4c59bd] text-white shadow-md hover:bg-[#3b48a1] transition">
          Next
        </button>
      </div>
    </div>
  );
};

export default AuthorSelector;
