import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import AuthContext from "../../auth/authContext";

export default function PostForm() {
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("Click to upload");
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
  });

  const { token } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get("/api/auth/protect", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setAuthorized(res.data.authorized);
      });
    if (!token) {
      navigate("/login");
    } else {
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
    setSubmitting(true);
    // Add code here to submit the form data
    axios.post("/api/posts", formData).then((res) => {
      navigate(`/posts/${res.data._id}`);
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
              <div className="flex items-center justify-center w-full border-2 border-gray-400 rounded-lg">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                  className="dark:text-white dark:bg-black appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 border-gray-400 rounded-lg"
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
                className="dark:text-white dark:bg-black appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 border-gray-400 rounded-lg"
              />
            </div>
            <div className="mt-4">
              {submitting ? (
                <>
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
                  <span className="text-rose-500">Uploading</span>
                </>
              ) : (
                <button
                  type="submit"
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Upload
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <h1>Not authorized</h1>
      )}
    </>
  );
}
