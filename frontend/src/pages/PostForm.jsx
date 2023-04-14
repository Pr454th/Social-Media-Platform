import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import AuthContext from "../auth/authContext";

export default function PostForm() {
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("Click to upload");
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
  });

  const { token } = useContext(AuthContext);
  console.log(token);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/protect", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        setAuthorized(res.data.authorized);
      });
    if (!token) {
      navigate("/login");
    } else {
      console.log(token);
      console.log("token is present");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFileName(event.target.files[0].name);
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageData(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.image = imageData;
    formData.artist = localStorage.getItem("user");
    console.log(formData);
    // Add code here to submit the form data
    axios.post("http://localhost:3000/api/posts", formData).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      {authorized ? (
        <div className="dark:bg-black mx-8 drop-shadow-2xl">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg mx-auto my-8"
            method="POST"
          >
            <div className="grid md:grid-cols-1 sm:grid-cols-1 gap-4">
              <div className="flex items-center justify-center w-full border-2 border-cyan-400 rounded-lg">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">{selectedFileName}</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      JPEG or JPG (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-bold mb-2 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={handleChange}
                  value={formData.title}
                  placeholder="Enter a title for your post"
                  className="dark:text-white dark:bg-black appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 border-cyan-400 rounded-lg"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2 dark:text-white"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                onChange={handleChange}
                value={formData.description}
                placeholder="Enter a description for your post"
                className="dark:text-white dark:bg-black appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 border-cyan-400 rounded-lg"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <h1>Not authorized</h1>
      )}
    </>
  );
}
