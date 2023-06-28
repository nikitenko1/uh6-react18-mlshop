import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { NumericFormat } from "react-number-format";
import { createOrderApi } from "../api/orderApi";
import { clearCart } from "../redux/slices/cartSlice";
import Loading from "../components/loading/Loading";
import CartItem from "../components/shared/CartItem";

const CheckOut = () => {
  const [newOrder, setNewOrder] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    note: "",
    totalOrder: "",
    statusOrder: "Confirming",
    payments: "Ship Cash on delivery",
    isPaid: false,
  });

  const onChangeInput = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const { cart } = useSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const VAT = 20;

  const result = useMemo(() => {
    const totalMoney = cart.reduce((cur, p) => cur + p.quantity * p.newPrice, 0);

    return {
      total: totalMoney + (totalMoney * VAT) / 100,
      totalNotVAT: totalMoney,
    };
  }, [cart]);

  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createOrderApi({
        ...newOrder,
        products: cart,
        totalOrder: result.total,
      });
      if (res.data.success) {
        dispatch(clearCart());
        setLoading(false);
        navigate("/thank-you");
        toast.success("Successful purchase!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Purchase failed!");
      setLoading(false);
    }
  };

  if (cart.length === 0) return <Navigate to="/" />;

  return (
    <div className="mt-10">
      <div className="container flex bg-white justify-between md:flex-row flex-col py-4">
        <div className="md:w-[65%] w-full">
          <div className="shadow-md p-4">
            <h1
              className="cursor-pointer border-[#bc13fe] font-bold uppercase text-[#bc13fe]
            hover:border-b-2 transition-all"
            >
              Create a new order
            </h1>

            <form onSubmit={formSubmit} className="mt-4">
              <div className="mb-4">
                <label className="block mb-3">Customer name</label>
                <input
                  type="text"
                  name="name"
                  value={newOrder.name}
                  onChange={onChangeInput}
                  className="w-full px-2 py-1 border rounded-md"
                  placeholder="Ex: Nikitenko1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-3">Phone number</label>
                <input
                  type="number"
                  name="phoneNumber"
                  value={newOrder.phoneNumber}
                  onChange={onChangeInput}
                  className="w-full px-2 py-1 border rounded-md"
                  placeholder="Ex: +38-067-535-000-00"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-3">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newOrder.email}
                  onChange={onChangeInput}
                  className="w-full px-2 py-1 border rounded-md"
                  placeholder="Ex: ua-you@gmail.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-3">Address</label>
                <input
                  type="text"
                  name="address"
                  value={newOrder.address}
                  onChange={onChangeInput}
                  className="w-full px-2 py-1 border rounded-md"
                  placeholder="Ex: UA Kyiv Darnitsa"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-3">Payment methods</label>
                <select
                  name="payments"
                  value={newOrder.payments}
                  onChange={onChangeInput}
                  className="w-full px-2 py-1 border rounded-md"
                  placeholder="Ex: UA Darnitsa"
                  required
                >
                  <option value="Ship Cash on delivery">Ship Cash on delivery</option>
                  <option value="Bank card">Bank card</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-3">Note</label>
                <textarea
                  rows={4}
                  type="text"
                  name="note"
                  value={newOrder.note}
                  onChange={onChangeInput}
                  className="w-full px-2 py-1 border rounded-md"
                />
              </div>

              <button
                className="w-full px-2 py-1 text-[18px] bg-amber-400 rounded-md text-[#b2071d] 
              ring-inset ring-2 hover:ring-[#b2071d]"
              >
                Purchase
              </button>
            </form>
          </div>
        </div>
        <div className="md:w-[30%] w-full h-[700px] overflow-auto shadow-md">
          <div className="p-4">
            <h1 className="text-[20px] font-semibold">Total order value</h1>
          </div>
          <div>
            {cart.map((p) => (
              <CartItem showQuanty key={p.colors + p.memories} cart={p} />
            ))}
          </div>
          <div className="w-[100%] bg-amber-400 p-4 text-white">
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
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default CheckOut;
