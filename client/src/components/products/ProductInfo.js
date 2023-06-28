import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { NumericFormat } from "react-number-format";
import { v4 } from "uuid";
import Option from "./Option";

const ProductInfo = ({ data }) => {
  const [colors, setColors] = useState([]);
  const [memories, setMemories] = useState([]);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    if (colors.length === 0 || memories.length === 0)
      return toast.error("Please select memory color and version!");
    dispatch(
      addToCart({
        ...product,
        colors: colors[0],
        memories: memories[0],
        quantity: 1,
      })
    );
    return toast.success("Added to cart!");
  };

  return (
    <div className="flex-1 mt-4 bg-white p-2">
      <div className="flex items-center">
        <p className="ml-1 text-[30px] text-red-500 font-semibold">
          <NumericFormat
            value={data.newPrice}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"₴"}
          />
        </p>
        <p className="text-gray-500 text-md ml-2 line-through">
          <NumericFormat
            value={data.oldPrice}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"₴"}
          />
        </p>
      </div>
      <button
        className="bg-amber-400 mt-3 w-full px-2 py-1 text-[#b2071d] rounded-md ring-inset ring-2 hover:ring-[#b2071d]
      flex items-center justify-center"
      >
        <i className="bx bxs-train text-2xl mr-2 text-white"></i> Free ship
      </button>
      <div className="mt-2">
        <p className="text-sm my-1 font-semibold">Color selection</p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {data.colors?.map((p) => (
            <Option checkedInput={colors} setCheckedInput={setColors} key={v4()} content={p} />
          ))}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm my-1 font-semibold">Version Selection</p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {data.memories?.map((p) => (
            <Option key={p} content={p} checkedInput={memories} setCheckedInput={setMemories} />
          ))}
        </div>
      </div>
      <div>
        <p className="font-semibold mt-2">Promotion</p>
        <div>
          <button className="p-1 bg-red-600 ring-2 hover:ring-orange-500 text-white my-1 rounded-md">
            KM1
          </button>
          <p className="text-xs mt-2">
            Buy-in offer: Discount 100,000 Microsoft 365 Personal 32/64bit 1 year 1 Win/Mac user
            when buy laptop and macbook products
          </p>
        </div>
        <div>
          <button className="p-1 bg-red-600 ring-2 hover:ring-orange-500 text-white my-1 rounded-md">
            KM2
          </button>
          <p className="text-xs mt-2">
            Buy-in offer: 1,000 off Office Home & Student 2023 (Forever; for 01 Windows/Mac) when
            buying with laptop and macbook products
          </p>
        </div>
      </div>
      <button
        onClick={() => handleAddToCart(data)}
        className="bg-amber-400 my-3 w-full p-2 justify-center text-[#b2071d] rounded-md flex items-center
        ring-inset ring-2 hover:ring-[#b2071d]"
      >
        Add product to cart
      </button>
    </div>
  );
};

export default ProductInfo;
