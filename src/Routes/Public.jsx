import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Addservice from "../Pages/Add Service/Addservice";
import AllBooks from "../Pages/AllBooks/Allbooks";
import Login from "../Pages/Author/Login/Login";
import Register from "../Pages/Author/Register/Register";
import { Bolgs } from "../Pages/Blogs/Blogs";
import Revew from "../Pages/Book Revew/Revew";
import Home from "../Pages/Home/Home";
import MyReview from "../Pages/Myreview/MyReview";
import Private from "./Private";
import Wrong from "./Wrong";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allBooks",
        element: <AllBooks></AllBooks>,
        loader: () => fetch("https://assinmetten.vercel.app/book"),
      },
      {
        path: "/book/:id",
        element: <Revew></Revew>,
        loader: ({ params }) =>
          fetch(`https://assinmetten.vercel.app/book/${params.id}`),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Register></Register>,
      },
      {
        path: "/myReview",
        element: (
          <Private>
            <MyReview></MyReview>
          </Private>
        ),
      },
      {
        path: "/addService",
        element: (
          <Private>
            <Addservice></Addservice>
          </Private>
        ),
      },
      {
        path: "/blogs",
        element: <Bolgs></Bolgs>,
      },
      {
        path: "*",
        element: <Wrong></Wrong>,
      },
    ],
  },
]);
export default router;
