import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FaAngleRight, FaBookOpen } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import useTitle from "../../hooks/useTitle";

const Revew = () => {
  const info = useLoaderData([]);
  const [reviews, setReview] = useState([]);

  const { name, picture, about, balance, _id } = info;
  const { user } = useContext(AuthContext);
  useTitle(name);

  useEffect(() => {
    fetch(`https://assinmetten.vercel.app/review/${_id}`)
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, [reviews,_id]);

  const fromSubmit = (event) => {
    event.preventDefault();
    const review = event.target.review.value;
    const data = {
      user,
      review,
      postid: _id,
      name,
    };
    console.log(review);

    if (user) {
      fetch("https://assinmetten.vercel.app/review", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          Swal.fire("Thank you", "Review post successfully", "success");
          event.target.reset();
        })
        .catch((er) => console.error(er));
    } else {
      Swal.fire("Sorry", "First login Then Submit", "error");
    }
  };

  return (
    <div className="bg-gray-100">
      <section>
        <div className="px-4 py-16  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="lg:pr-10">
              <Link
                to="/"
                aria-label="Go Home"
                title="Logo"
                className="inline-block mb-5"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-200">
                  <FaBookOpen className="text-5xl"></FaBookOpen>
                </div>
              </Link>
              <h5 className="mb-4 text-indigo-400 text-4xl font-extrabold leading-none">
                {name}
              </h5>

              <p className="mb-6 text-gray-900">{about}</p>
              <p className="text-2xl font-semibold mb-4">
                Price Of This Book : $ {balance}
              </p>
              <hr className="mb-5 border-gray-300" />
              <Link
                to="/"
                aria-label=""
                className="inline-flex gap-6 items-center font-semibold transition-colors duration-200 text-indigo-400 hover:text-indigo-800"
              >
                Back To Home<FaAngleRight></FaAngleRight>
              </Link>
            </div>
            <div>
              <PhotoProvider>
                <PhotoView src={picture}>
                  <img
                    src={picture}
                    className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
                    alt=""
                  />
                </PhotoView>
              </PhotoProvider>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h1 className="text-5xl text-center ">Review Section</h1>

        <div className="container  m:max-w-xl md:max-w-full  lg:max-w-screen-xl py-20 mx-auto grid grid-cols-1 gap-8 lg:gap-20 md:px-10 md:pb-10 lg:grid-cols-2">
          {reviews.map((data) => (
            <div className="flex flex-col bg-white p-4 rounded-xl items-center mx-12 lg:mx-0">
              <div className="relative text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="absolute top-0 left-0 w-4 h-4 dark:text-purple-700"
                >
                  <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                  <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                </svg>
                <h1 className="font-bold">{data?.name}</h1>
                <p className="px-6 py-1 mx-4  text-2xl italic">
                  {data?.review}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="absolute bottom-0 right-0 w-4 h-4 dark:text-purple-700"
                >
                  <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                  <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                </svg>
              </div>
              <span className="w-12 h-1 my-2 rounded-lg dark:bg-violet-400"></span>
              <img
                className="h-10 w-10 rounded-full"
                src={data.user.photoURL}
                alt=""
              />
              <h1 className="font-bold">{data.user.displayName}</h1>
            </div>
          ))}
        </div>

        <form onSubmit={fromSubmit} className="text-center">
          <label className="block px-10">
            <span className="">Drop Your Own Review</span>
            <textarea
              rows="3"
              type="text"
              name="review"
              className="block mx-auto py-2 w-full lg:w-3/5 mb-4 mt-6 rounded-md focus:ring px-2 focus:ring-opacity-75 focus:ring-violet-400 dark:bg-white"
            ></textarea>
          </label>
          <div className="py-4">
            <button
              type="submit"
              className="self-center px-8 py-4 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 dark:bg-violet-400 dark:text-gray-900 focus:ring-violet-400 mb-4 hover:ring-violet-400"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Revew;
