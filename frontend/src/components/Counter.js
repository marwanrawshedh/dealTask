import React from "react";

const Counter = ({ count, label }) => {
  return (
    <div
      className={`flex items-center  bg-opacity-50 text-gray-800 p-2 rounded-md`}
    >
      <span className="mr-2">{label}:</span>
      <span className="font-bold text-xl">{count}</span>
    </div>
  );
};

export default Counter;
