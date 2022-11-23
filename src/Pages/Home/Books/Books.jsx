import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://assinmetten.vercel.app/book?size=3")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books);
      });
  }, []);
  return (
    <div>
      <h1 className="text-5xl font-bold text-center">
        Books Of <span className="text-purple-500">Edgar Allan Poe</span>
      </h1>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-20 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {books.map((book) => (
            <Card key={book._id} book={book}></Card>
          ))}
        </div>
      </div>

      <div className="text-center pb-20">
        <Link
          to={"/allBooks"}
          className="inline-flex items-center justify-center h-9  px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default Books;
