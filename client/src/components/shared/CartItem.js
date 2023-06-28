import React from "react";
import { img_url } from "../../utils/img";
import { NumericFormat } from "react-number-format";
import { increase, decrease, deleteCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ cart, showQuantity }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between border-t-2 border-b-2 p-6 flex-wrap">
      <div className="flex items-center">
        <div className="w-[100px] rounded-md overflow-hidden">
          <img className="w-full h-full object-cover" src={cart?.thumbnail} alt="thumbnail" />
        </div>
        <div className="text-sm text-[#222] py-2 ml-6">
          <p className="mb-2">
            {cart?.name?.length > 54 ? cart?.name.slice(0, 54) + "..." : cart?.name}
          </p>
          <p className="mb-2">{cart?.memories}</p>
          <p className="mb-2">{cart?.colors}</p>
          {!showQuantity && <p>Quantity: {cart.quantity}</p>}
        </div>
      </div>
      {showQuantity && (
        <div className="flex items-center mt-6 md:mt-0">
          <div className="flex items-center justify-center border-2">
            <p
              className="px-2 border-r-2 cursor-pointer"
              onClick={() => dispatch(increase({ key: cart.colors + cart.memories }))}
            >
              <i className="bx bx-plus text-lg"></i>
            </p>
            <p className="text-md px-3">{cart?.quantity}</p>
            <p
              className="px-2 border-l-2 cursor-pointer"
              onClick={() => dispatch(decrease({ key: cart.colors + cart.memories }))}
            >
              <i className="bx bx-minus text-lg"></i>
            </p>
          </div>
          <div className="ml-6">
            <p>
              <NumericFormat
                value={cart?.newPrice}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"₴"}
              />
            </p>
          </div>
          <div className="ml-6" onClick={() => dispatch(deleteCart(cart.colors + cart.memories))}>
            <i className="bx bx-x text-2xl"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
