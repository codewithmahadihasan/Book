import React from "react";
import { useLoaderData } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import CardComponent from "./CardComponent";

const AllBooks = () => {
  const data = useLoaderData();
  const books = data.books;

  // Addd Title
  useTitle("All Books");

  return (
    <div>
      <h1 className="text-5xl font-bold text-center pt-20">
        Books Of <span className="text-purple-500">Edgar Allan Poe</span>
      </h1>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-20 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {books.map((book) => (
            <CardComponent key={book._id} book={book}></CardComponent>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
