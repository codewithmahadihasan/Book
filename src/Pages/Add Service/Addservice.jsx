import { data } from "autoprefixer";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import useTitle from "../../hooks/useTitle";

const Addservice = () => {
  const date = Date.now();

  // Add Title 
  useTitle("Add Service");

  // Add Services 

  const form = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const price = form.price.value;
    const photo = form.url.value;
    const info = form.info.value;
    const data = {
      name: name,
      balance: price,
      picture: photo,
      about: info,
      date: date,
    };

    // Fetch For Post 

    fetch("https://assinmetten.vercel.app/addservice", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Thank you", "Service Added Successfully", "success");
        form.reset();
      })
      .catch((er) => console.error(er));
  };

  return (
    <div className=" p-6 dark:bg-gray-300  px-4 py-20  ">
      <section className="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-20 ">
        <form
          onSubmit={form}
          className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <div className="grid grid-cols-4 gap-6 p-6 rounded-md ">
            <div className="grid grid-cols-6 gap-4 col-span-full justify-center lg:col-span-6">
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm py-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Name"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 py-2 px-2 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm py-2">Price</label>
                <input
                  type="number"
                  placeholder="$ Price"
                  required
                  name="price"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 py-2 px-2 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-6">
                <label className="text-sm">Phot Url</label>
                <input
                  type="url"
                  name="url"
                  required
                  placeholder="https://"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 py-2 px-2 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
                />
              </div>

              <div className="col-span-full">
                <label className="text-sm">Info</label>
                <textarea
                  name="info"
                  required
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 h-20 py-2 px-3 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
                ></textarea>
              </div>
              <div className="col-span-full">
                <button
                  className="px-4 py-2 border rounded-md dark:border-gray-100 hover:bg-[#052F57] hover:text-white"
                  type="submit"
                >
                  Add service
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Addservice;
