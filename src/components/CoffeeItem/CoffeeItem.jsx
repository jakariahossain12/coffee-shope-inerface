import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const CoffeeItem = ({ coffee, coffeeData, setCoffeeData }) => {
  const { name, chef, price, photo, _id } = coffee;
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/coffee/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.deletedCount) {
              const newCoffee = coffeeData.filter((cof) => cof._id !== id);
              setCoffeeData(newCoffee);
            }
          });

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-blue-400 p-4">
      <div className="flex items-center">
        {/* <!-- Coffee Image --> */}
        <div className="w-1/2">
          <img src={photo} alt="Black Coffee" className="w-full h-auto" />
        </div>

        {/* <!-- Coffee Info --> */}
        <div className="w-1/2 pl-4 space-y-2">
          <p className="text-lg font-semibold">
            <span className="text-gray-700">Name:</span> {name}
          </p>
          <p className="text-lg font-semibold">
            <span className="text-gray-700">Chef:</span> {chef}
          </p>
          <p className="text-lg font-semibold">
            <span className="text-gray-700">Price:</span> {price}
          </p>

          {/* <!-- Action Buttons --> */}
          <div className="flex space-x-2 pt-2">
            <Link to={`coffee-details/${_id}`} className="bg-yellow-300 cursor-pointer hover:bg-yellow-400 text-white p-2 rounded">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4a8 8 0 100 16 8 8 0 000-16zm1 11h-2v-2h2v2zm0-4h-2V7h2v4z" />
              </svg>
            </Link>
            <button
              onClick={() => handleDelete(_id)}
              className="bg-red-500 cursor-pointer hover:bg-red-600 text-white p-2 rounded"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zm3.5-9h1v7h-1v-7zm5 0h1v7h-1v-7zM15.5 4l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
              </svg>
            </button>
            <Link
              to={`/coffee-upDate/${_id}`}
              className="bg-gray-600 cursor-pointer hover:bg-gray-700 text-white p-2 rounded"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34a1.25 1.25 0 000-1.77l-2-2a1.25 1.25 0 00-1.77 0l-1.83 1.83 3.75 3.75 1.85-1.81z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeItem;
