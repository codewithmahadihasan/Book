import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useTitle from "../../../hooks/useTitle";
import { AuthContext } from "../../../Provider/AuthProvider";
import Loader from "../../../Routes/Loader";

const Login = () => {
  const { loginWithEamil, Google, Github, loading } = useContext(AuthContext);
  let location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const data = location?.state?.from?.pathname || "/";
  const [error, setError] = useState();

  useTitle("Login");

  if (loading) {
    return (
      <>
        <Loader></Loader>
      </>
    );
  }

  // Sign In with email

  const fromButton = (event) => {
    event.preventDefault();
    const from = event.target;
    const email = from.email.value;
    const password = from.password.value;
    setEmail(email);
    loginWithEamil(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        fetch("https://error-five.vercel.app/jwt", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("token", data.token);
            Swal.fire("Login Successful", "Thanks for your login.", "success");
            navigate(data, { replace: true });
          });
      })
      .catch((error) => {
        const message = error.message.split("Error");
        setError(message.slice(1, 500));
      });
  };

  //   Google Login   //
  const google = () => {
    Google()
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
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
            navigate(data, { replace: true });
            Swal.fire(
              "Google Login Successful",
              "Thanks For Your Login",
              "success"
            );
          });

        // ...
      })

      .catch((error) => {
        const message = error.message.split("Error");
        Swal.fire(`${message.slice(1, 500)}`, error, "error");
      });
  };

  //   Github Login   //
  const github = () => {
    Github()
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
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
            navigate(data, { replace: true });
            Swal.fire(
              "Github Login Successful",
              "Thanks for your login.",
              "success"
            );
          });

        // ...
      })
      .catch((error) => {
        const message = error.message.split("Error");
        Swal.fire(`${message.slice(1, 500)}`, error, "error");
      });
  };

  return (
    <div>
      <div className="relative">
        <img
          src="https://c4.wallpaperflare.com/wallpaper/995/32/980/crow-raven-ink-animals-wallpaper-preview.jpg"
          className="absolute  object-cover bg-cover w-full h-full "
          alt=""
        />
        <div className="relative pb-28  bg-gray-900 bg-opacity-75">
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
                  aria-label=""
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
              <div className="lg:w-96 w-full text-blue-200">
                <div className="w-full shadow-xl hover:shadow-sky-600  shadow-teal-800  max-w-md p-8 space-y-3 rounded-xl bg-gray-900 text-gray-100">
                  <h1 className="text-2xl font-bold text-center">Login</h1>
                  <form
                    onSubmit={fromButton}
                    action=""
                    className="space-y-6 ng-untouched ng-pristine ng-valid"
                  >
                    <div className="space-y-1 text-sm">
                      <label className="block text-gray-400">E-mail</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="E-mail"
                        required
                        className="w-full px-4 py-3  rounded-md border-gray-700 bg-gray-100 text-gray-900 focus:border-violet-400"
                      />
                    </div>
                    <div className="space-y-1 text-sm">
                      <label className="block text-gray-400">Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        required
                        className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-100 text-gray-900 focus:border-violet-400"
                      />
                      <div className="flex justify-end text-xs text-gray-400">
                        <button className="hover:text-red-300">
                          Forgot Password?
                        </button>
                      </div>
                      <p className="text-xs text-red-600">{error}</p>
                    </div>

                    <button
                      type="submit"
                      className="block w-full p-3 text-center rounded-sm text-gray-900 bg-violet-400 hover:bg-violet-600"
                    >
                      Sign in
                    </button>
                    <p className="text-xs mt-10 text-center sm:px-6 text-gray-400">
                      Do you have an account?
                      <Link
                        rel="noopener noreferrer"
                        to="/signup"
                        className="hover:underline  ml-2  text-gray-100"
                      >
                        Sign up
                      </Link>
                    </p>
                  </form>
                  <div className="flex items-center mb-2  space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                    <p className="px-3 text-sm text-gray-400">or</p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-700 "></div>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={google}
                      aria-label="Log in with Google"
                      className="p-3 rounded-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="w-5 h-5 hover:text-blue-300 fill-current"
                      >
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                      </svg>
                    </button>

                    <button
                      onClick={github}
                      aria-label="Log in with GitHub"
                      className="p-3 rounded-sm "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="w-5 h-5 hover:text-blue-300 fill-current"
                      >
                        <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                      </svg>
                    </button>
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

export default Login;
