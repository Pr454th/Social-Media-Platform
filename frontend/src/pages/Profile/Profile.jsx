import React, { useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = React.useState({});
  const params = useParams();
  const userID = params.name;
  const initials = userID.slice(0, 1);
  useEffect(() => {
    axios.get(`http://localhost:3000/api/users/${userID}`).then((res) => {
      console.log(res.data);
      setUserData(res.data);
    });
  }, []);

  return (
    <div className="bg-black text-white py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-center items-center md:space-x-4">
      <div className="flex flex-col items-center md:items-start dark:bg-gray-800 p-4 rounded-md">
        <h1 className="mb-6 text-3xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
          Profile
        </h1>
        <div className="flex items-center justify-center w-48 h-48 bg-purple-500 rounded-full flex-shrink-0 mx-auto">
          <span className="text-4xl font-bold text-white">{initials}</span>
        </div>
        <div className="flex items-center mb-4">
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
      <div className="w-full md:w-1/2 mt-8 md:mt-0 dark:bg-gray-800 rounded-md p-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Posts</h2>
        {userData?.posts &&
          userData.posts.map((post) => (
            <div className="bg-gray-800 rounded-md p-4 mb-4" key={post._id}>
              <Link to={`http://localhost/posts/${post._id}`}>
                <h3 className="text-lg font-bold">{post.title}</h3>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
