import React from "react";
import { Link, useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();
  return (
    <div className="md:w-[200px] bg-slate-50 w-full my-3">
      <h1 className="mb-4 font-semibold bg-white border-amber-400 border-b-2 p-2">Category</h1>
      <ul className="px-2">
        <Link
          to={`/product?page=1`}
          className={`p-2 border-b-2 block ${!category ? "bg-amber-400 text-white" : ""}`}
        >
          All products
        </Link>
        <Link
          to={`/product/Phone?page=1`}
          className={`p-2 border-b-2 block ${
            category === "Phone" ? "bg-amber-400 text-white" : ""
          }`}
        >
          Mobile phone
        </Link>
        <Link
          to={`/product/Tablet?page=1`}
          className={`p-2 border-b-2 block ${
            category === "Tablet" ? "bg-amber-400 text-white" : ""
          }`}
        >
          Tablet
        </Link>
        <Link
          to={`/product/Laptop?page=1`}
          className={`p-2 border-b-2 block ${
            category === "Laptop" ? "bg-amber-400 text-white" : ""
          }`}
        >
          Laptop
        </Link>
        <Link
          to={`/product/Watch?page=1`}
          className={`p-2 border-b-2 block ${
            category === "Watch" ? "bg-amber-400 text-white" : ""
          }`}
        >
          Watch
        </Link>
      </ul>
    </div>
  );
};

export default Category;
