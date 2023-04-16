import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Posts() {
  const [ids, setIds] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const imageSrc = (image) => {
    const a = image.split(",")[1];
    var b = a.replace("dataimage", "data:image").replace("base64", ";base64,");
    return b;
  };

  useEffect(() => {
    setPosts([]);
    setIds([]);
    axios.get("/api/posts/ids").then((res) => {
      setIds(res.data);
    });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setPosts([]);
      console.log(ids.length);
      for (let i = 0; i < ids.length; i++) {
        axios.get(`/api/posts/${ids[i]._id}`).then((res) => {
          res.data.imageData = imageSrc(res.data.imageSrc);
          setPosts((posts) => [...posts, res.data]);
        });
      }
    };
    if (ids.length > 0) {
      fetchPosts();
      console.log(posts);
    }
  }, [ids]);
  // axios.get("/api/posts").then((res) => {
  //   setPosts(res.data);
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8">
      {posts &&
        posts
          .filter(
            (item, index, self) =>
              index === self.findIndex((t) => t._id === item._id)
          )
          .map((post) => (
            <Link to={`/posts/${post._id}`} key={post._id}>
              <div className="card p-4 bg-white rounded-lg shadow-md drop-shadow-2xl bg-white dark:bg-black dark:text-white border-2 border-rose-400 ">
                <img
                  className="w-full h-48 object-cover mb-4"
                  src={post.imageData}
                  alt="Card 4"
                />
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-700 text-base dark:text-cyan-400">
                  {post.description.length > 100 ? (
                    <>{post.description.substring(0, 100)}...</>
                  ) : (
                    <>{post.description}</>
                  )}
                </p>
              </div>
            </Link>
          ))}
    </div>
  );
}
