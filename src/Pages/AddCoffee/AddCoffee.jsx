import React from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddCoffee = () => {
  const nevgate = useNavigate();
  const notify = () => toast.success("coffee add successfully");
  const handleAddCoffee = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const coffeeData = Object.fromEntries(formData.entries());

    fetch("http://localhost:3000/coffee", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(coffeeData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("post after data", data);
        if (data.insertedId) {
          notify()
          e.target.reset()
        }
      });
  };
  return (
    <div className="min-h-screen bg-[#f4f3f0] p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => nevgate(-1)}
          className="text-blue-700 font-semibold text-lg inline-block mb-6 hover:underline"
        >
          ← Back to home
        </button>

        <div className="bg-[#f4f3f0] p-10 rounded-lg shadow-md border border-blue-400">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Add New Coffee
          </h2>
          <p className="text-center text-gray-600 mb-8">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using Content here.
          </p>

          <form onSubmit={handleAddCoffee} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter coffee name"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Chef
                </label>
                <input
                  name="chef"
                  type="text"
                  placeholder="Enter coffee chef"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Supplier
                </label>
                <input
                  name="supplier"
                  type="text"
                  placeholder="Enter coffee supplier"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Taste
                </label>
                <input
                  name="taste"
                  type="text"
                  placeholder="Enter coffee taste"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Price
                </label>
                <input
                  name="price"
                  type="text"
                  placeholder="Enter coffee category"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Details
                </label>
                <input
                  name="details"
                  type="text"
                  placeholder="Enter coffee details"
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Photo
              </label>
              <input
                name="photo"
                type="text"
                placeholder="Enter photo URL"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full hover:rounded-4xl hover:text-white cursor-pointer mt-4 bg-[#d2b48c] hover:bg-[#c49c74] text-black py-2 px-4 font-semibold rounded border border-black"
            >
              Add Coffee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCoffee;
