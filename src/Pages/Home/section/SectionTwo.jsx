import React from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

const SectionTwo = () => {
  return (
    <div>
      <div>
        <div className="flex flex-col-reverse lg:flex-row px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-20   justify-between gap-20 items-center ">
          <div className="mb-16 lg:w-1/2 lg:px-0 px-10 ">
            <div className="mb-6">
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider uppercase bg-purple-500 text-teal-900 rounded-full">
                Writer
              </p>
            </div>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none max-w-lg mb-6">
              Edgar Allan Poe
            </h2>
            <p className="text-gray-700 text-base md:text-lg">
              Edgar Poe was born on January 19th, 1809 to traveling actors Eliza
              and David Poe. When Edgar was a baby, David abandoned the family,
              leaving Eliza to support three young children. In a devastating
              turn, Eliza contracted tuberculosis and spent the last few months
              of her life in Richmond. She died on December 8th, 1811 at the age
              of 24, leaving behind her three children.
            </p>

            <Link
              to={"/allBooks"}
              className="inline-flex gap-6 items-center font-semibold transition-colors duration-200 text-purple-400 hover:text-purple-800 pt-6"
            >
              Show all books <FaAngleRight></FaAngleRight>
            </Link>
          </div>

          <div className="lg:w-1/2 flex justify-center  lg:justify-end">
            <img
              title="Edgar Allan"
              className="object-cover w-3/5  rounded-lg shadow-2xl shadow-gray-900 hover:shadow-purple-400"
              src="https://i.ibb.co/m01FMqw/poe1.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;
