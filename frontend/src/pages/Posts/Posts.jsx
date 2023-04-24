import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Paginate from "../../components/Pagination/Paginate";
import axios from "axios";
import { set } from "mongoose";

export default function Posts() {
  const [ids, setIds] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activePage, setActivePage] = useState(1);

  const imageSrc = (image) => {
    const a = image.split(",")[1];
    var b = a.replace("dataimage", "data:image").replace("base64", ";base64,");
    return b;
  };

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber.selected + 1}`);
    setActivePage(pageNumber.selected + 1);
  };

  useEffect(() => {
    console.log("run");
    // setPosts([]);
    // setIds([]);
    axios.get("/api/posts/ids").then((res) => {
      setIds(res.data);
    });
    //   setIds(res.data);
    //   console.log(res.data);
    //   const postsArr = [];
    //   res.data.forEach(async (id, idx) => {
    //     const { data } = await axios.get(`/api/posts/${id._id}`);
    //     setPosts((posts) => {
    //       console.log("adding " + idx);
    //       return [...posts, data];
    //     });
    //     // axios.get(`/api/posts/${id._id}`).then((res) => {
    //     //   res.data.imageData = imageSrc(res.data.imageSrc);
    //     //   postsArr.push(res.data);
    //     //   // setPosts((posts) => [...posts, res.data]);
    //     // });
    //   });
    // });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      // console.log(ids.length);
      for (let i = 0; i < ids.length; i++) {
        axios.get(`/api/posts/${ids[i]._id}`).then((res) => {
          res.data.imageData = imageSrc(res.data.imageSrc);
          setPosts((posts) => [...posts, res.data]);
        });
      }
    };
    if (ids.length > 0) {
      fetchPosts();
    }
  }, [ids]);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8">
        {posts &&
          posts
            .slice((activePage - 1) * 5, (activePage - 1) * 5 + 5)
            .map((post) => (
              <Link to={`/posts/${post._id}`} key={post._id}>
                <div className="card p-4 bg-white rounded-lg shadow-md drop-shadow-2xl dark:bg-gray-800 dark:text-white m-4">
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
      <div className="flex justify-center text-white">
        <Paginate
          activePage={activePage}
          itemsCountPerPage={5}
          totalItemsCount={posts.length}
          handlePageChange={handlePageChange}
          pageCount={Math.ceil(posts.length / 5)}
        />
      </div>
    </>
  );
}

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
