import React from "react";
import { FaAndroid } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FiArrowUpRight } from "react-icons/fi";

export default function Download() {
  return (
    <div>
      <div className="bg-gray-900 min-h-screen py-8 mx-4">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold mb-8 text-white">
            Download Our Apps
          </h1>
          <div className="bg-gray-800 rounded-lg shadow p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center">
              <FaAndroid className="text-5xl text-green-500 mr-4" />
              <div>
                <h2 className="text-xl font-bold text-white">
                  Download the Android App
                </h2>
                <p className="text-gray-400">
                  Get the full experience on your Android device.
                </p>
              </div>
              <div className="md:ml-auto m-4">
                <a
                  href="https://drive.google.com/file/d/1srz--9sxH8CsH0her9iZYlIIRncKg1-2/view?usp=sharing"
                  className="flex items-center text-blue-400 hover:text-blue-300"
                >
                  Download
                  <IoIosArrowForward className="text-lg ml-2" />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row items-center">
              <FiArrowUpRight className="text-5xl text-pink-500 mr-4" />
              <div>
                <h2 className="text-xl font-bold text-white">
                  Download the AR App
                </h2>
                <p className="text-gray-400">
                  Scan images to view augmented reality content.
                </p>
              </div>
              <div className="md:ml-auto m-4">
                <a
                  href="https://drive.google.com/file/d/1j1jcPCPmbUYqX1FCSieck8YWkdQdG3it/view?usp=sharing"
                  className="flex items-center text-blue-400 hover:text-blue-300"
                >
                  Download
                  <IoIosArrowForward className="text-lg ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
