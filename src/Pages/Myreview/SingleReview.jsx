import React, { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";

const SingleReview = ({ data, handaleDelete, update, setUpdate }) => {
  const { review, name, _id } = data;
  const [edit, setEidt] = useState(false);

  const [update2, setUpdate2] = useState(review);

  const handelUpdate = (event) => {
    event.preventDefault();
    const newReview = event.target.review.value;
    console.log(newReview);

    fetch(`https://assinmetten.vercel.app/review/${_id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ review: newReview }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdate2(data);
        setUpdate(!update);
      });
  };

  return (
    <div>
      <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-gray-700 dark:bg-gray-900 dark:text-gray-100">
        <div className="flex justify-between p-4">
          <div className="flex space-x-4">
            <div>
              <img
                src={data?.user?.photoURL}
                alt=""
                className="object-cover w-12 h-12 rounded-full dark:bg-gray-500"
              />
            </div>
            <div>
              <h4 className="font-bold">{data?.user?.displayName}</h4>
              <span className="text-xs dark:text-gray-400">
                {data?.user?.email}
              </span>
            </div>
          </div>
          <div className="flex items-center hidden md:block space-x-2 dark:text-yellow-500">
            {name}
          </div>
        </div>
        <div className="p-4 space-y-2 text-sm dark:text-gray-400">
          <p>{review}</p>
        </div>
        <div className="p-4 space-y-2 md:flex text-center justify-around items-start text-sm dark:text-gray-400">
          <div className="flex justify-center">
            <button
              className="bg-[#83c083] text-black  flex gap-4 items-center px-4 h-9 py-1 rounded font-bold"
              onClick={() => handaleDelete(_id)}
            >
              Delete <FaTimesCircle></FaTimesCircle>
            </button>
          </div>
          <button
            className={edit ? "hidden" : ""}
            onClick={() => setEidt(true)}
          >
            Edit
          </button>

          {edit ? (
            <div>
              <form onSubmit={handelUpdate}>
                <textarea
                  className="px-2 py-2"
                  name="review"
                  id=""
                  cols="30"
                  rows="2"
                ></textarea>

                <div className="flex items-center justify-center gap-4 pt-4">
                  <button
                    type="submit"
                    className="px-2 py-2 bg-[#83c083] text-black font-bold rounded "
                  >
                    Update
                  </button>
                  <button
                    className="px-2 ml-4 py-2  rounded-full text-black  bg-gray-200 "
                    onClick={() => setEidt(false)}
                  >
                    <FaTimesCircle></FaTimesCircle>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
