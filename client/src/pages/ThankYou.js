import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-10">
      <div className="container bg-white p-4 flex flex-col items-center justify-center">
        <h1 className="text-[60px] font-semibold my-10">Thank You!</h1>
        <p className="mb-4 border p-4 text-center">
          Thank you for your support, we will contact you ASAP
        </p>
        <button
          onClick={() => navigate("/")}
          className="py-1 px-4 bg-amber-400 ring-inset ring-2 hover:ring-[#b2071d] my-4 text-white"
        >
          Back to home page!
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
