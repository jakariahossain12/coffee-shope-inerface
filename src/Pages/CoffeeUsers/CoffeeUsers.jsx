import React, { use, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/Context";
import Swal from "sweetalert2";

const CoffeeUsers = () => {
  const usersDataArray = useLoaderData();
  const { userDelete } = use(AuthContext);

  const [usersData, setUsersData] = useState(usersDataArray);

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
        fetch(`http://localhost:3000/coffee/user/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const newUser = usersData.filter((user) => user._id !== id);
              setUsersData(newUser);
              userDelete()
                .then(() => {})
                .catch(() => {});
            }
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your user has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-green-600 text-red-50">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>phone</th>
              <th>lastSignInTime</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user._id} className="border-b-2 border-b-blue-700">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.name}</div>
                      <div className="text-sm opacity-50">{user?.address}</div>
                    </div>
                  </div>
                </td>
                <td>{user?.email}</td>
                <td>{user?.phone}</td>
                <td>{user?.lastSignInTime}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">E</button>
                  <button
                    onClick={() => handleDelete(user?._id)}
                    className="btn btn-ghost btn-xs"
                  >
                    X
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoffeeUsers;
