import React from "react";
import { HiOutlineChatAlt2 } from "react-icons/hi";
// import { useRef, useEffect } from "react";

const CommentSection = (props) => {
  // const commentRef = useRef();
  // useEffect(() => {
  //   commentRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [comments]);
  const { comments } = props;
  return (
    <div className="rounded-lg p-4 overflow-y-auto shadow-2xl text-black dark:text-white">
      <h2 className="text-gray-900 text-black dark:text-white text-2xl flex items-center mb-4">
        <HiOutlineChatAlt2 className="inline-block mr-2 text-blue-400" />{" "}
        Comments
      </h2>
      <ul>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <li className="mb-4 rounded-md dark:bg-gray-800 p-4">
              <div className="flex items-center mb-2">{comment.comment}</div>
              <p className="text-gray-500 dark:text-grey-400">{comment.user}</p>
            </li>
          ))
        ) : (
          <li>
            <div className="flex text-2xl mb-4 text-gray-500 dark:text-red-400 items-center justify-center">
              <p>No comments yet</p>
            </div>
          </li>
        )}
        {/* <li ref={commentRef}></li> */}
      </ul>
    </div>
  );
};

export default CommentSection;
