import React from "react";
import { FaPaintBrush } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <div className="dark:bg-gray-900 text-white min-h-screen p-8">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              <FaPaintBrush className="mr-2 inline-block" />
              Artistic Hub
            </h1>
          </header>
          <main className="mt-8">
            <p className="text-lg">
              Welcome to Artistic Hub, where artists can share their work and
              get feedback from their peers.
            </p>
            <p className="mt-4 text-lg">
              Here, you can post your artwork and let other artists comment on
              it. You can also browse the works of other artists and leave your
              comments.
            </p>
          </main>
          <footer className="mt-8 text-center absolute inset-x-0 bottom-0">
            <p>&copy; 2023 Artistic Hub. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
