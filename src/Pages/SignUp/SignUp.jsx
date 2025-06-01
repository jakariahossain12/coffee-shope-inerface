import React, { use } from "react";
import { AuthContext } from "../../Context/Context";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const SignUp = () => {
  const { signUpUser, userUpDateProfile } = use(AuthContext);
  const navgation = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // const m = formData.entries()
    //   const k = m.toArray();
    // console.log(Object.fromEntries(formData.entries()));

    const { email, password, photo, name, ...rest } = Object.fromEntries(
      formData.entries()
    );

    // ============ create account with firebase ============
    signUpUser(email, password)
      .then((res) => {
        // ============ set name and photo in firebase ============
        const UpdateInfo = {
          displayName: name,
          photoURL: photo,
        };

        userUpDateProfile(UpdateInfo)
          .then(() => {
            // ============ set user info in mongodb ============
            const userData = {
              name,
              email,
              photo,
              ...rest,
              creationTime: res?.user?.metadata?.creationTime,
              lastSignInTime: res?.user?.metadata?.lastSignInTime,
            };

            fetch("http://localhost:3000/coffee-user", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(userData),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your account create successfully",
                    showConfirmButton: false,
                    timer: 3000,
                  });
                  navgation("/");
                }
              });
          })
          .catch(() => {});
      })
      .catch(() => {});
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm dark:text-gray-600">
            Sign Up to Create your account
          </p>
        </div>
        <form
          onSubmit={handleSignUp}
          noValidate=""
          action=""
          className="space-y-12"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="enter your name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 text-sm">
                phone
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="enter your phone number"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
            </div>

            <div>
              <label htmlFor="address" className="block mb-2 text-sm">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="enter your address"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
            </div>
            <div>
              <label htmlFor="photo" className="block mb-2 text-sm">
                Photo
              </label>
              <input
                type="text"
                name="photo"
                id="photo"
                placeholder="photo url"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full cursor-pointer px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
              >
                Sign Up
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-600">
              Already have an account yet?
              <a
                rel="noopener noreferrer"
                href="#"
                className="hover:underline dark:text-violet-600"
              >
                Sign in
              </a>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
