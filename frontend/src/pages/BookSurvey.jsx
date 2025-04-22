import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../utils/client";
import {  useNavigate } from "react-router-dom";


const books = [
  {
    title: "Wild Animus",
    img: "http://images.amazon.com/images/P/0971880107.01.THUMBZZZ.jpg",
  },
  {
    title: "The Lovely Bones: A Novel",
    img: "http://images.amazon.com/images/P/0316666343.01.THUMBZZZ.jpg",
  },
  {
    title: "The Da Vinci Code",
    img: "http://images.amazon.com/images/P/0385504209.01.THUMBZZZ.jpg",
  },
  {
    title: "Divine Secrets of the Ya-Ya Sisterhood: A Novel",
    img: "http://images.amazon.com/images/P/0060928336.01.THUMBZZZ.jpg",
  },
  {
    title: "The Red Tent (Bestselling Backlist)",
    img: "http://images.amazon.com/images/P/0312195516.01.THUMBZZZ.jpg",
  },
  {
    title: "A Painted House",
    img: "http://images.amazon.com/images/P/044023722X.01.THUMBZZZ.jpg",
  },
  {
    title: "The Secret Life of Bees",
    img: "http://images.amazon.com/images/P/0142001740.01.THUMBZZZ.jpg",
  },
  {
    title: "Snow Falling on Cedars",
    img: "http://images.amazon.com/images/P/067976402X.01.THUMBZZZ.jpg",
  },
  {
    title: "Angels & Demons",
    img: "http://images.amazon.com/images/P/0671027360.01.THUMBZZZ.jpg",
  },
  {
    title: "Where the Heart Is (Oprah's Book Club (Paperback))",
    img: "http://images.amazon.com/images/P/0446672211.01.THUMBZZZ.jpg",
  },
  {
    title: "Harry Potter and the Sorcerer's Stone (Harry Potter (Paperback))",
    img: "http://images.amazon.com/images/P/059035342X.01.THUMBZZZ.jpg",
  },
  {
    title: "The Pilot's Wife : A Novel",
    img: "http://images.amazon.com/images/P/0316601950.01.THUMBZZZ.jpg",
  },
  {
    title: "House of Sand and Fog",
    img: "http://images.amazon.com/images/P/0375727345.01.THUMBZZZ.jpg",
  },
  {
    title: "The Firm",
    img: "http://images.amazon.com/images/P/044021145X.01.THUMBZZZ.jpg",
  },
  {
    title: "Girl with a Pearl Earring",
    img: "http://images.amazon.com/images/P/0452282152.01.THUMBZZZ.jpg",
  },
  {
    title: "The Pelican Brief",
    img: "http://images.amazon.com/images/P/0440214041.01.THUMBZZZ.jpg",
  },
  {
    title: "The Joy Luck Club",
    img: "http://images.amazon.com/images/P/0804106304.01.THUMBZZZ.jpg",
  },
  {
    title: "A Time to Kill",
    img: "http://images.amazon.com/images/P/0440211727.01.THUMBZZZ.jpg",
  },
  {
    title: "Interview with the Vampire",
    img: "http://images.amazon.com/images/P/0345337662.01.THUMBZZZ.jpg",
  },
  {
    title: "The Poisonwood Bible: A Novel",
    img: "http://images.amazon.com/images/P/0060930535.01.THUMBZZZ.jpg",
  },
];














const StarRating = ({ rating, onChange }) => {
  return (
    <div className="flex justify-center gap-1 mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className={`w-6 h-6 transition-colors ${
            rating >= star ? "text-yellow-400" : "text-gray-300"
          } hover:text-yellow-300`}
          aria-label={`Rate ${star} stars`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ))}
    </div>
  );
};

const BookCard = ({ title, img, rating, onRatingChange }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <img
        src={img}
        alt={title}
        className="w-32 h-48 object-cover rounded-lg mb-3 border border-gray-200"
      />
      <h3 className="text-sm font-medium text-center mb-2 h-12 overflow-hidden text-ellipsis line-clamp-2">
        {title}
      </h3>
      <StarRating rating={rating} onChange={onRatingChange} />
    </div>
  );
};

const BookSurvey = () => {
    const navigate = useNavigate();


  const [ratings, setRatings] = useState({});
  const MIN_RATINGS = 10;

  const ratedCount = Object.values(ratings).filter((r) => r > 0).length;

  const handleRatingChange = (bookTitle, newRating) => {
    setRatings((prev) => ({ ...prev, [bookTitle]: newRating }));
  };

  const handleBookRatingUpload = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/ml/user-rating`, {
        ratings
      });
     console.log("recommended response ",response)
      if (response.status === 200) {
        // Corrected navigation - pass the data in the state property
        navigate('/recommended-books', { 
          state: { 
            data: response.data // Make sure this matches your backend response structure
          } 
        });
      }
    } catch (error) {
      console.error('Error uploading ratings:', error);
      // Optional: Add user feedback here
      alert('Failed to get recommendations. Please try again.');
    }
  };

  return (
    <div className="bg-[#FCF5EA] min-h-screen pb-8 px-8">
      <div className="flex flex-col items-center justify-start pt-10 max-w-6xl mx-auto">
        <h2
          style={{ fontFamily: "Virgil" }}
          className="text-3xl p-4 mb-2 text-center"
        >
          Rate These Books
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-[#4c59bd] h-2.5 rounded-full transition-all duration-300"
            style={{
              width: `${Math.min((ratedCount / MIN_RATINGS) * 100, 100)}%`,
            }}
          />
        </div>

        <p className="text-gray-600 mb-6 text-center">
          {ratedCount >= MIN_RATINGS
            ? "🎉 Great job! You can now continue"
            : `Rate at least ${MIN_RATINGS} books to continue (${ratedCount}/${MIN_RATINGS})`}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full">
          {books.map((book) => (
            <BookCard
              key={book.title}
              title={book.title}
              img={book.img}
              rating={ratings[book.title] || 0}
              onRatingChange={(newRating) =>
                handleRatingChange(book.title, newRating)
              }
            />
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-8 w-full">
          <button
          onClick={handleBookRatingUpload}
            disabled={ratedCount < MIN_RATINGS}
            className={`px-8 py-3 text-base font-medium rounded-xl transition-all ${
              ratedCount >= MIN_RATINGS
                ? "bg-[#4c59bd] text-white shadow-lg hover:bg-[#3b48a1] hover:shadow-md"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookSurvey;
