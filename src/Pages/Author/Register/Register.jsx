import { updateProfile } from "firebase/auth";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useTitle from "../../../hooks/useTitle";
import Loader from "../../../Routes/Loader";

const Register = () => {
  const { RegistrationInEmail, loading } = useContext(AuthContext);
  const [passerror, setPasserror] = useState();
  const navigate = useNavigate();
  useTitle("Register");

  if (loading) {
    return (
      <>
        <Loader></Loader>
      </>
    );
  }

  // Registration with Email

  const fromButton = (event) => {
    event.preventDefault();
    const from = event.target;
    const name = from.name.value;
    const email = from.email.value;
    const password = from.password.value;
    const url = from.url.value;

    if (password.length >= 6) {
      RegistrationInEmail(email, password)
        .then((result) => {
          // Update user
          updateProfile(result.user, {
            displayName: name,
            photoURL: url,
          });

          // Fetch for token
          fetch("https://error-five.vercel.app/jwt", {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(result.user),
          })
            .then((res) => res.json())
            .then((data) => {
              localStorage.setItem("token", data.token);
              navigate("/");
              setPasserror("");
              Swal.fire(
                "Your registration is complete",
                "Now You Are A Register User",
                "success"
              );
            });
        })

        .catch((error) => {
          const message = error.message.split("Error");
          Swal.fire(`${message.slice(1, 500)}`, error, "error");
        });
    } else {
      setPasserror("Please enter six digit password");
    }
  };

  return (
    <div>
      <div>
        <div className="relative">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/44/92/946/dragon-fantasy-art-digital-art-artwork-wallpaper-preview.jpg"
            className="absolute  object-cover bg-cover w-full h-full"
            alt=""
          />
          <div className="relative pb-28 bg-opacity-70 bg-gray-900">
            <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
              <div className="flex flex-col items-center justify-between xl:flex-row">
                <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                  <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                    WELCOME TO EDGAR ALLAN POE STORIES
                  </h2>
                  <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                    JOIN WITH US AND SHOW OUR ALL UPDATE DATA
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-400 hover:text-teal-700"
                  >
                    Go To Home Page
                    <svg
                      className="inline-block w-3 ml-2"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                    </svg>
                  </Link>
                </div>
                <div className="lg:w-96 w-full  text-blue-200">
                  <div className="w-full  max-w-md mx-auto  shadow-xl shadow-teal-800 hover:shadow-sky-600  p-8  rounded-xl bg-gray-900 text-gray-100">
                    <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                    <form
                      onSubmit={fromButton}
                      action=""
                      className="space-y-3 ng-untouched ng-pristine ng-valid"
                    >
                      <div className=" text-sm">
                        <label className="block mb-1 text-gray-400">Name</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Name"
                          required
                          className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-200 text-gray-900 focus:border-violet-400"
                        />
                      </div>
                      <div className=" text-sm">
                        <label className="block mb-1 text-gray-400">
                          Photo URL
                        </label>
                        <input
                          type="url"
                          name="url"
                          id="url"
                          placeholder="PhotoURL"
                          required
                          className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-200 text-gray-900 focus:border-violet-400"
                        />
                      </div>
                      <div className=" text-sm">
                        <label className="block mb-1 text-gray-400">
                          E-Mail
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="E-mail"
                          required
                          className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-200 text-gray-900 focus:border-violet-400"
                        />
                      </div>
                      <div className=" text-sm">
                        <label className="block mb-1 text-gray-400">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Password"
                          required
                          className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-200 text-gray-900 focus:border-violet-400 mb-3"
                        />
                        <p className="text-xs text-red-600"></p>
                        {passerror}
                      </div>
                      <button
                        type="submit"
                        className="block w-full p-3 text-center rounded-sm text-gray-900 bg-violet-400 hover:bg-violet-600"
                      >
                        Sign Up
                      </button>
                      <p className="text-xs text-center sm:px-6 text-gray-400">
                        Don't have an account?
                        <Link
                          rel="noopener noreferrer"
                          to="/login"
                          className="hover:underline mt-10  ml-2  text-gray-100"
                        >
                          Log in
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
