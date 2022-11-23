import { useState } from "react";
import useTitle from "../../hooks/useTitle";

const Item = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  useTitle("Blogs");
  return (
    <div className="border-b">
      <button
        type="button"
        aria-label="Open item"
        title="Open Answer"
        className="flex items-center justify-between w-full p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-lg font-medium">{title}</p>
        <svg
          viewBox="0 0 24 24"
          className={`w-3 text-gray-600 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            points="2,7 12,17 22,7"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          <p className="text-gray-700">{children}</p>
        </div>
      )}
    </div>
  );
};

export const Bolgs = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 ">
      <h1 className="text-4xl font-bold text-center pb-20">
        This is the blog section
      </h1>
      <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
        <div className="space-y-4">
          <Item title="Difference between SQL and NoSQL ?">
            SQL is the programming language used to interface with relational
            databases. (Relational databases model data as records in rows and
            tables with logical links between them). NoSQL is a class of DBMs
            that are non-relational and generally do not use SQL. And five
            change such as
            <br />
            1. Language 2.Scalability 3.Structure 4.Properties 5.Support and
            communities
          </Item>
          <Item title="What is JWT, and how does it work ?">
            The purpose of using JWT is not to hide data but to ensure the
            authenticity of the data. JWT is signed and encoded, not encrypted.
            JWT is a token based stateless authentication mechanism. Since it is
            a client-side based stateless session, server doesn't have to
            completely rely on a datastore(database) to save session
            information.
          </Item>
          <Item title="What is the difference between javascript and NodeJS ?">
            JavaScript is a simple programming language that can be used with
            any browser that has the JavaScript Engine installed. Node. js, on
            the other hand, is an interpreter or execution environment for the
            JavaScript programming language.
          </Item>
          <Item title="How does NodeJS handle multiple requests at the same time ?">
            NodeJS receives multiple client requests and places them into
            EventQueue. NodeJS is built with the concept of event-driven
            architecture. NodeJS has its own EventLoop which is an infinite loop
            that receives requests and processes them.
          </Item>
        </div>
      </div>
    </div>
  );
};
