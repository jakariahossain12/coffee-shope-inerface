import React, { use, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/Context";
import axios from "axios";

const CoffeeDetails = () => {
  const item = useLoaderData();
  const { user } = use(AuthContext);
  console.log(item);

  const [likeby, setLikeBy] = useState(false);
  const [likeCount, setLikeCount] = useState(item?.likes?.length);

  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    setLikeBy(item?.likes.includes(user?.email));
  },[setLikeBy,item,user])

  const handleLike = () => {
    if (user?.email === item?.email) {
      return alert("sorom korena");
    }

    axios
      .patch(`http://localhost:3000/coffee-like/${item?._id}`, {
        email: user?.email,
      })
      .then((res) => {
        const isLike = res.data.like;
        setLikeBy(isLike);
        setLikeCount((prev) => (isLike ? prev + 1 : prev - 1));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOrder = () => {
    setOrdered(true);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <img
          src={item.photo}
          alt={item.name}
          className="w-full h-80 object-cover rounded-xl"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{item.name}</h2>
          <p className="text-gray-600 mb-1">
            <strong>Chef:</strong> {item.chef}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Supplier:</strong> {item.supplier}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Taste:</strong> {item.taste}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Price:</strong> ${item.price}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Quantity:</strong> {item.quantity}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Likes:</strong> {likeCount}
          </p>
          <p className="text-gray-700 mb-6">
            <strong>Details:</strong> {item.details}
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleLike}
              className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-xl shadow-md transition"
            >
              {likeby ? "❤️ Liked" : "❤️ Like"}
            </button>
            <button
              onClick={handleOrder}
              disabled={ordered}
              className={`${
                ordered ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              } text-white px-5 py-2 rounded-xl shadow-md transition`}
            >
              {ordered ? "Ordered" : "🛒 Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetails;
