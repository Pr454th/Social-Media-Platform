import React from "react";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../auth/authContext";
import { useAuthDispatch, useAuthState } from "../../Context/AuthContext";
import { useCookies } from "react-cookie";

export default function Login() {
  const authDispatch = useAuthDispatch();
  const authState = useAuthState();
  const navigate = useNavigate();
  const [logging, setLogging] = useState(false);
  const [error, setError] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputs = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(authState);
    if (authState.isAuthenticated) {
      console.log("isAuthenticated");
    }
  }, [authState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogging(true);
    axios.post("/api/auth/login", formData).then((res) => {
      if (res.data.error) {
        setLogging(false);
        setError(res.data.error);
        return;
      }
      console.log(res.data);
      authDispatch({
        type: "LOGIN",
        token: res.data.token,
        isAuthenticated: true,
      });
      setCookie("token", res.data.token, { path: "/" });
      navigate(`/profile/${res.data.user.artistname}`);
    });
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-black rounded-md mt-4">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Login to Our Creative Hub Today
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Step into a world of boundless creativity and self-expression as
              you log into our artistically curated hub, where every stroke of
              genius is welcomed with open arms.
            </p>
            <a
              href="https://github.com/Pr454th/Social-Media-Platform"
              className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
            >
              Read more about our app
              <svg
                aria-hidden="true"
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </a>
          </div>
          <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Sign in to Artistic Hub
              </h2>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email Address"
                    onChange={handleInputs}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleInputs}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                {logging ? (
                  <div className="flex ">
                    <svg
                      aria-hidden="true"
                      className="inline w-7 h-7 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-rose-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="text-rose-500">Logging in</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <button
                      type="submit"
                      className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Login to your account
                    </button>
                    {error && error !== "" ? (
                      <div className="text-red-500 text-lg">{error}</div>
                    ) : (
                      ""
                    )}
                  </div>
                )}
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Not registered yet?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
