import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Posts() {
  const [imageData, setImageData] = useState(null);
  const [posts, setPosts] = useState(null);
  const imageSrc = (image) => {
    const a = image.split(",")[1];
    var b = a.replace("dataimage", "data:image").replace("base64", ";base64,");
    return b;
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/posts").then((res) => {
      console.log(res.data);
      setPosts(res.data);
      // console.log(res.data.imageSrc);
      // const a = res.data.imageSrc.split(",")[1];
      // var b = a
      //   .replace("dataimage", "data:image")
      //   .replace("base64", ";base64,");
      // setImageData(
      //   res.data.imageSrc
      //     .split(",")[1]
      //     .replace("dataimage", "data:image")
      //     .replace("base64", ";base64,")
      // );
      // console.log(
      //   res.data.imageSrc
      //     .split(",")[1]
      //     .replace("dataimage", "data:image")
      //     .replace("base64", ";base64,")
      // );
    });
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8">
      {posts &&
        posts.map((post) => (
          <Link to={`/posts/${post._id}`}>
            <div className="card p-4 bg-white rounded-lg shadow-md drop-shadow-2xl bg-white dark:bg-black dark:text-white border-2 border-rose-400 ">
              <img
                className="w-full h-48 object-cover mb-4"
                src={imageSrc(post.imageData)}
                alt="Card 4"
              />
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-700 text-base dark:text-cyan-400">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
