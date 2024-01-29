// AnimatedComponent.jsx
import React from "react";
import "animate.css";

const AnimatedComponent = () => {
  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center px-2 sm:px-2">
      {/* Animated element in the center */}
      <div className="bg-white p-8 rounded-md shadow-md animate__animated animate__bounceIn">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to our Website!
        </h1>
        <p className="text-gray-600"></p>
      </div>
    </div>
  );
};

export default AnimatedComponent;
