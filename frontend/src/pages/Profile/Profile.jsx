import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaExternalLinkAlt } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = React.useState({});
  const [owner, setOwner] = useState(false);
  const params = useParams();
  const userID = params.name;
  const initials = userID.slice(0, 1);
  useEffect(() => {
    axios.get(`/api/users/${userID}`).then((res) => {
      setUserData(res.data);
      axios.get("/api/auth/protect").then((auth) => {
        if (auth.id === res.data._id) {
          setOwner(true);
        }
      });
    });
  }, []);

  const handleDelete = (e) => {};

  return (
    <div className="bg-black text-white py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-center items-stretch md:space-x-4">
      <div className="flex flex-col items-center md:items-start dark:bg-gray-800 p-4 rounded-md">
        <h1 className="mb-6 text-3xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
          Profile
        </h1>
        <div className="flex items-center justify-center w-32 h-32 bg-purple-500 rounded-full flex-shrink-0 mx-auto">
          <span className="text-4xl font-bold text-white">{initials}</span>
        </div>
        <div className="flex items-center mb-4 mt-4">
          <FaUser className="mr-2" size={24} />
          <h2 className="text-2xl font-bold">{userData?.artistname}</h2>
        </div>
        <div className="flex items-center mb-4">
          <FaEnvelope className="mr-2" size={24} />
          <p className="text-lg">{userData?.email}</p>
        </div>
        <div className="flex items-center mb-4">
          <FaPhone className="mr-2" size={24} />
          <p className="text-lg">{userData?.phone}</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 mt-8 md:mt-0 dark:bg-gray-800 rounded-md p-4 overflow-y-auto max-h-96">
        <h1 className="mb-6 text-3xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
          Posts
        </h1>
        <div className="flex-col items-center">
          {userData?.posts && userData?.posts.length > 0 ? (
            userData.posts.map((post) => (
              <>
                <div
                  className="bg-gray-800 rounded-md p-2 flex justify-between align-middle"
                  key={post._id}
                >
                  <Link
                    to={`/posts/${post._id}`}
                    className="text-rose-500 hover:text-rose-700"
                  >
                    <div className="flex items-center mb-2 align-middle0">
                      <FaExternalLinkAlt className="mr-2" size={40} />
                      <p className="text-2xl">{post?.title}</p>
                    </div>
                  </Link>
                  <div>
                    <button onClick={handleDelete} value={post._id}>
                      <CiCircleRemove className="mr-2" size={20} />
                    </button>
                  </div>
                </div>
              </>
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
