import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useTitle from "../../hooks/useTitle";
import { AuthContext } from "../../Provider/AuthProvider";
import Loader from "../../Routes/Loader";
import NodataFound from "./NodataFound";
import SingleReview from "./SingleReview";

const MyReview = () => {
  const { user, setLoading, loading } = useContext(AuthContext);
  const [myReviews, setMyReviews] = useState([]);
  const [flag, setFlag] = useState(true);
  const [update, setUpdate] = useState(false);

  useTitle("MyReview");

  const handaleDelete = (id) => {
    const proceed = window.confirm("do you want to delete");
    if (proceed) {
      fetch(`https://assinmetten.vercel.app/review/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            Swal.fire(
              "Delete Successfully",
              "Your review now deleted",
              "success"
            );

            setFlag(!flag);
          }
        });
    }
  };

  const id = user;
  console.log(id);

  useEffect(() => {
    if (user.email) {
      setLoading(true);
      fetch(`https://assinmetten.vercel.app/myReview?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMyReviews(data);
          setLoading(false);
        });
    }
  }, [user?.email, flag, update]);
  console.log(myReviews);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="bg-gray-200">
      <div className=" px-4 py-20 mx-auto grid grid-cols-1 gap-5 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        {myReviews.length > 0 ? (
          <>
            {myReviews.map((data) => (
              <SingleReview
                update={update}
                setUpdate={setUpdate}
                data={data}
                key={data._id}
                handaleDelete={handaleDelete}
              ></SingleReview>
            ))}
          </>
        ) : (
          <>
            <NodataFound></NodataFound>
          </>
        )}
      </div>
    </div>
  );
};

export default MyReview;
