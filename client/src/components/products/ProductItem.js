import React from "react";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";

const ProductItem = ({ data }) => {
  return (
    <div className="w-full flex flex-col justify-between rounded-md p-3 bg-white">
      <Link to={`/product/details/${data._id}`} className="overflow-hidden block aspect-auto">
        <img
          className="w-full h-full object-cover img-product"
          src={data.thumbnail}
          alt="thumbnail"
        />
      </Link>
      <div>
        <Link
          to={`/product/details/${data._id}`}
          className="mt-3 block hover:underline transition-all line-clamp-2"
        >
          {data.name}
        </Link>
        <div className="flex items-center justify-center flex-wrap mt-4">
          <p className="text-gray-500 text-xs mr-2 line-through">
            <NumericFormat
              value={data.oldPrice}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"₴"}
            />
          </p>
          <p className="ml-1 font-semibold text-[#b2071d] text-2xl">
            <NumericFormat
              value={data.newPrice}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"₴"}
            />
          </p>
        </div>
        <Link
          to={`/product/details/${data._id}`}
          className="bg-amber-400 ring-inset ring-2 hover:ring-[#b2071d] text-white rounded-md mt-3 text-center py-2 block w-full"
        >
          View info
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
