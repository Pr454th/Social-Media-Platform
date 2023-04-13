import React from "react";
import { HiOutlineChatAlt2 } from "react-icons/hi";

const CommentSection = () => {
  return (
    <div className="border border-gray-700 rounded-lg p-4 overflow-y-auto shadow-2xl text-black dark:text-white">
      <h2 className="text-gray-900 text-black dark:text-white text-2xl flex items-center mb-4">
        <HiOutlineChatAlt2 className="inline-block mr-2 text-blue-400" />{" "}
        Comments
      </h2>
      <ul>
        <li className="mb-4">
          <div className="flex items-center mb-2">kjhjhfhrhthtrtihtuu</div>
          <p className="text-gray-500 dark:text-grey-400">
            kjhjhfhrhthtrtihtuu
          </p>
        </li>
        <li className="mb-4">
          <div className="flex items-center mb-2">kjhjhfhrhthtrtihtuu</div>
          <p className="text-gray-500 dark:text-gray-400">
            kjhjhfhrhthtrtihtuu
          </p>
        </li>
        <li className="mb-4">
          <div className="flex items-center mb-2">kjhjhfhrhthtrtihtuu</div>
          <p className="text-gray-500 dark:text-gray-400">
            kjhjhfhrhthtrtihtuu
          </p>
        </li>
        <li className="mb-4">
          <div className="flex items-center mb-2">kjhjhfhrhthtrtihtuu</div>
          <p className="text-gray-500 dark:text-gray-400">
            kjhjhfhrhthtrtihtuu
          </p>
        </li>
        <li className="mb-4">
          <div className="flex items-center mb-2">kjhjhfhrhthtrtihtuu</div>
          <p className="text-gray-500 dark:text-gray-400">
            kjhjhfhrhthtrtihtuu
          </p>
        </li>
        <li className="mb-4">
          <div className="flex items-center mb-2">kjhjhfhrhthtrtihtuu</div>
          <p className="text-gray-500 dark:text-gray-400">
            kjhjhfhrhthtrtihtuu
          </p>
        </li>
      </ul>
    </div>
  );
};

export default CommentSection;
