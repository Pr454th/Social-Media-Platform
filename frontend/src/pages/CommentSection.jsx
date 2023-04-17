import React from "react";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import AuthContext from "../auth/authContext";

const CommentSection = (props) => {
  const { comments } = props;
  return (
    <div className="rounded-lg p-4 overflow-y-auto shadow-2xl text-black dark:text-white">
      <h2 className="text-gray-900 dark:text-white text-2xl flex items-center mb-4">
        <HiOutlineChatAlt2 className="inline-block mr-2 text-blue-400" />{" "}
        Comments
      </h2>
      <ul>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <li
              className="mb-4 rounded-md dark:bg-gray-800 p-4"
              key={comment._id}
            >
              <div className="flex items-center mb-2">{comment.comment}</div>
              <p className="text-gray-500 dark:text-grey-400">{comment.user}</p>
            </li>
          ))
        ) : (
          <li>
            <div className="flex text-xl mb-4 text-gray-500 dark:text-gray-400 items-center justify-center">
              <p>Comments to this post will appear here</p>
            </div>
          </li>
        )}
        {/* <li ref={commentRef}></li> */}
      </ul>
    </div>
  );
};

export default CommentSection;
