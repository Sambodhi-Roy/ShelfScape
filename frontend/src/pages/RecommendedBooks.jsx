import React from "react";
import { useLocation } from 'react-router-dom';

const BookCard = ({ title, img }) => {
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
        </div>
    );
};

const RecommendedBooks = () => {
    const location = useLocation();
    const recommendedBooks = location.state?.data.data || [];

    console.log("Recommended books data:", recommendedBooks);


    return (
        <div className="bg-[#FCF5EA] min-h-screen pb-8 px-8">
            <div className="flex flex-col items-center justify-start pt-10 max-w-6xl mx-auto">
                <h2
                    style={{ fontFamily: "Virgil" }}
                    className="text-3xl p-4 mb-2 text-center"
                >
                    {recommendedBooks.length > 0 ? "Recommended Books" : "No Recommendations Found"}
                </h2>

                {recommendedBooks.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full">
                        {recommendedBooks.map((book) => (
                            <BookCard
                                key={book['Book-Title']}
                                title={book['Book-Title']}
                                img={book['Image-URL-S']}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-600">We couldn't find any recommendations based on your ratings.</p>
                        <p className="text-gray-600">Please try rating different books.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendedBooks;