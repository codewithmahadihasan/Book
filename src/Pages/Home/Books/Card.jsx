import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const Card = ({ book }) => {
  const { picture, name, about, _id } = book;
  return (
    <div>
      <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-2xl hover:shadow-gray-500">
        <PhotoProvider>
          <PhotoView src={picture}>
            <img src={picture} className="object-cover w-full h-64" alt="" />
          </PhotoView>
        </PhotoProvider>
        <div className="p-5 border border-t-0">
          <h1
            title={name}
            className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-purple-700"
          >
            {name}
          </h1>
          <p className="mb-2 text-gray-700">{about.slice(0, 100)}...</p>
          <Link
            to={`/book/${_id}`}
            aria-label=""
            className="inline-flex gap-6 items-center font-semibold transition-colors duration-200 text-purple-400 hover:text-purple-800"
          >
            Show Details <FaAngleRight></FaAngleRight>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
