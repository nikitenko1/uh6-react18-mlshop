import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import CartItem from "../components/shared/CartItem";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);

  const VAT = 20;

  const result = useMemo(() => {
    const totalMoney = cart.reduce((cur, p) => cur + p.quantity * p.newPrice, 0);

    return {
      total: totalMoney + (totalMoney * VAT) / 100,
      totalNotVAT: totalMoney,
    };
  }, [cart]);

  const navigate = useNavigate();

  const handleNavigateCheckout = () => {
    if (cart.length === 0) return;
    navigate("/check-out");
  };

  return (
    <div className="flex items-center justify-center py-10 container flex-col rounded-md">
      <div className="w-full h-[100%] bg-white overflow-auto flex justify-center">
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-semibold">Shopping Cart</h1>
          <div className="mt-6 overflow-auto">
            {cart.length > 0 ? (
              cart?.map((p) => <CartItem showQuantity key={p.colors + p.memories} cart={p} />)
            ) : (
              <div className="aspect-[16/9] flex justify-center pb-4 flex-col">
                <img className="h-full object-cover" src="/no-results-found.png" alt="" />

                <Link to="/product?page=1" className="text-xl text-blue-500 my-4 text-center">
                  Shopping Now!
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[100%] bg-[#dff9fb] p-4">
        <h1 className="text-2xl font-semibold">Summary</h1>
        <div className="flex items-center justify-between mt-4">
          <p className="text-md">Total Products</p>
          <p className="text-md">{cart.length}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-md">Price does not include tax</p>
          <p className="text-md">
            <NumericFormat
              value={result.totalNotVAT}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"₴"}
            />
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-md">Tax VAT</p>
          <p className="text-md">{VAT + "%"}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-md">Total</p>
          <p className="text-md">
            <NumericFormat
              value={result.total}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"₴"}
            />
          </p>
        </div>
      </div>
      <button
        onClick={handleNavigateCheckout}
        className="p-2 bg-amber-400 rounded-md ring-inset ring-2 hover:ring-[#b2071d] text-black w-[100%]
         text-xl transition-colors"
      >
        Check Out
      </button>
    </div>
  );
};

export default Cart;
