import React from "react";
import CommentSection from "./CommentSection";
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Post = () => {
  const params = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [post, setPost] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const user = cookies.user.name;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/comments`, {
        comment: newComment,
        user: user,
        postid: params.id,
      })
      .then((res) => {
        comments.push(res.data);
        setNewComment("");
      });
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  useEffect(() => {
    axios.get(`/api/posts/${params.id}`).then((res) => {
      const a = res.data.imageSrc.split(",")[1];
      var b = a
        .replace("dataimage", "data:image")
        .replace("base64", ";base64,");
      setImageData(
        res.data.imageSrc
          .split(",")[1]
          .replace("dataimage", "data:image")
          .replace("base64", ";base64,")
      );
      setPost(res.data);
      setComments(res.data.comments);
      axios.get("/api/auth/protect").then((res) => {
        if (res.data.id != null) setAuthorized(true);
      });
    });
  }, []);

  const toggleLike = () => {};

  return (
    <div className="mb-0 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2">
      <div className="p-4">
        <div className="mb-0">
          <img
            src={imageData}
            alt="Post image"
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="flex flex-col mt-4">
            <h3 className="text-3xl text-gray-500 font-medium">
              {post?.title}
            </h3>
            <Link to={`/profile/${post?.artist}`}>
              <p className="text-xl text-blue-600">By {post?.artist}</p>
            </Link>
            <p className="text-rose-400 text-xl">{post?.description}</p>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col">
        <div className="rounded-md dark:bg-gray-700 mb-0 max-h-96 overflow-y-scroll">
          <CommentSection comments={comments} />
        </div>
        <div className="mt-4">
          {authorized && (
            <form className="my-2 shadow-xl" onSubmit={handleSubmit}>
              <div className="w-full mb-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-700">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    className="outline-none w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-700 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={handleCommentChange}
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                  >
                    Post comment
                  </button>
                  <div className="flex pl-0 space-x-1 sm:pl-2">
                    <button
                      type="button"
                      onClick={toggleLike}
                      className={`inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-red-400 dark:hover:text-white dark:hover:bg-gray-600`}
                    >
                      <svg
                        className="w-5 h-5 text-red"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 18.034l-8.682-8.415c-1.566-1.518-1.566-3.985 0-5.503 1.567-1.518 4.107-1.518 5.674 0l1.008.977 1.007-.977c1.567-1.518 4.107-1.518 5.674 0 1.566 1.518 1.566 3.985 0 5.503l-8.683 8.415z" />
                      </svg>

                      <span className="sr-only">Like</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
