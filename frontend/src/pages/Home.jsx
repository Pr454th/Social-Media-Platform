import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/posts/tt").then((res) => {
      // console.log(res.data.imageSrc);
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
      console.log(
        res.data.imageSrc
          .split(",")[1]
          .replace("dataimage", "data:image")
          .replace("base64", ";base64,")
      );
    });
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8">
      <div className="card p-4 bg-white rounded-lg shadow-md drop-shadow-2xl bg-white dark:bg-black dark:text-white border-2 border-rose-400 ">
        <img
          className="w-full h-48 object-cover mb-4"
          src={imageData}
          alt="Card 4"
        />
        <h2 className="text-xl font-bold mb-2">Card 1</h2>
        <p className="text-gray-700 text-base dark:text-cyan-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec augue
          id lectus molestie elementum.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed nec augue id lectus molestie elementum.Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Sed nec augue id
          lectus molestie elementum.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed nec augue id lectus molestie elementum.Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Sed nec augue id
          lectus molestie elementum.
        </p>
      </div>
      <div className="card p-4 bg-white rounded-lg shadow-md drop-shadow-2xl bg-white dark:bg-black dark:text-white border-2 border-rose-400 ">
        <img
          className="w-full h-48 object-cover mb-4"
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Card 4"
        />
        <h2 className="text-xl font-bold mb-2">Card 2</h2>
        <p className="text-gray-700 text-base dark:text-cyan-400">
          Sed lacinia, arcu vitae blandit faucibus, est turpis fringilla eros,
          ac consectetur felis tortor sit amet odio.
        </p>
      </div>
      <div className="card p-4 bg-white rounded-lg shadow-md drop-shadow-2xl bg-white dark:bg-black dark:text-white border-2 border-rose-400 ">
        <img
          className="w-full h-48 object-cover mb-4"
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Card 4"
        />
        <h2 className="text-xl font-bold mb-2">Card 3</h2>
        <p className="text-gray-700 text-base dark:text-cyan-400">
          Nullam vitae aliquam urna. In eu lacus et felis laoreet eleifend at id
          enim. Mauris molestie nisi quam.
        </p>
      </div>
      <div className="card p-4 bg-white rounded-lg shadow-md drop-shadow-2xl bg-white dark:bg-black dark:text-white border-2 border-rose-400 ">
        <img
          className="w-full h-48 object-cover mb-4"
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Card 4"
        />
        <h2 className="text-xl font-bold mb-2">Card 4</h2>
        <p className="text-gray-700 text-base dark:text-cyan-400">
          Sed et erat bibendum, maximus magna at, feugiat magna. Praesent
          feugiat velit a ante suscipit dapibus.
        </p>
      </div>
      <div className="card p-4 bg-white rounded-lg shadow-md drop-shadow-2xl bg-white dark:bg-black dark:text-white border-2 border-rose-400 ">
        <img
          className="w-full h-48 object-cover mb-4"
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Card 4"
        />
        <h2 className="text-xl font-bold mb-2">Card 5</h2>
        <p className="text-gray-700 text-base dark:text-cyan-400">
          Donec euismod nunc in justo bibendum, a ullamcorper nibh faucibus.
          Nulla porttitor orci eu odio congue, eu vestibulum nisl facilisis.
        </p>
      </div>
      <div className="card p-4 bg-white rounded-lg shadow-md drop-shadow-2xl bg-white dark:bg-black dark:text-white border-2 border-rose-400 ">
        <img
          className="w-full h-48 object-cover mb-4"
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Card 4"
        />
        <h2 className="text-xl font-bold mb-2">Card 6</h2>
        <p className="text-gray-700 text-base dark:text-cyan-400">
          Aliquam ut tincidunt massa. Proin ut justo at sem blandit fringilla eu
          vel velit. In maximus auctor justo, ac rhoncus ipsum tempor ut.
        </p>
      </div>
    </div>
  );
}
