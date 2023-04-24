import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaExternalLinkAlt } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState({});
  const [owner, setOwner] = useState(false);
  const [removing, setRemoving] = useState(false);
  const params = useParams();
  const userID = params.name;
  const initials = userID.slice(0, 1);
  useEffect(() => {
    axios.get(`/api/users/${userID}`).then((res) => {
      setUserData(res.data);
      axios.get("/api/auth/protect").then((auth) => {
        if (auth?.data?.user?._id === res.data._id) {
          setOwner(true);
        }
      });
    });
  }, []);

  const handleDelete = (value) => {
    setRemoving(true);
    axios.delete(`/api/posts/${value}`).then((res) => {
      axios.get(`/api/users/${userID}`).then((res) => {
        setUserData(res.data);
        setRemoving(false);
      });
    });
  };

  return (
    <div className="bg-black text-white py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-stretch ">
      <div className="flex flex-col md:flex-row items-center justify-around dark:bg-gray-800 p-4 rounded-md">
        <div>
          <h1 className="text-3xl font-bold m-4 text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
            Profile
          </h1>
        </div>
        <div>
          <div className="flex items-center justify-center w-32 h-32 bg-purple-500 rounded-full flex-shrink-0 mx-auto">
            <span className="text-4xl font-bold text-white">{initials}</span>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-4 mt-4">
            <FaUser className="mr-2" size={24} />
            <h2 className="text-2xl font-bold">{userData?.artistname}</h2>
          </div>
          <div className="flex items-center mb-4">
            <FaEnvelope className="mr-2" size={24} />
            <p className="text-lg">{userData?.email}</p>
          </div>
          <div className="flex items-center mb-4">
            <FaPhone
              className="mr-2"
              size={24}
              style={{ transform: "rotate(90deg)" }}
            />
            <p className="text-lg">{userData?.phone}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full mt-4 dark:bg-gray-800 rounded-md overflow-y-auto max-h-96">
        <div className="p-4">
          <h1 className="flex justify-between text-3xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
            Posts
            {removing && (
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-rose-600"
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
                <span className="text-rose-500 text-xl">Removing</span>
              </div>
            )}
          </h1>
        </div>
        <div className="flex-col items-center">
          {userData?.posts && userData?.posts.length > 0 ? (
            userData.posts.map((post, index) => (
              <div key={index}>
                <div
                  className="bg-gray-800 rounded-md p-2 flex justify-between align-middle"
                  key={index}
                >
                  <Link
                    to={`/posts/${post._id}`}
                    className="text-rose-500 hover:text-rose-700"
                  >
                    <div className="flex items-center ml-2 align-middle">
                      <FaExternalLinkAlt className="mr-2" size={25} />
                      <p className="text-2xl" key={index}>
                        {post?.title}
                      </p>
                    </div>
                  </Link>
                  {owner && (
                    <div key={index}>
                      <button onClick={() => handleDelete(post._id)}>
                        <CiCircleRemove className="mb-2" size={40} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex text-2xl mb-4 text-gray-500 dark:text-red-400 items-center justify-center">
              <p>No Posts yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
