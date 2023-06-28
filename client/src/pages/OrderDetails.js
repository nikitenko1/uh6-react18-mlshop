import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { getOrderbyIdApi } from "../api/orderApi";
import CartItem from "../components/shared/CartItem";
import Loading from "../components/loading/Loading";
import { calculateCreatedTime } from "../utils/formatDate";

const OrderDetails = () => {
  const [oderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    (async (id) => {
      try {
        setLoading(true);
        const res = await getOrderbyIdApi(id);
        if (res.data.success) {
          setOrderDetails({ ...res.data.order, ...res.data.orderDetails });
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })(id);
  }, [id]);

  return (
    <div className="mt-10">
      <div className="container flex bg-white justify-between md:flex-row flex-col py-4">
        <div className="md:w-[65%] h-[622px] w-full">
          <div className="shadow-md p-4 h-full">
            <h1
              className="text-[20px] cursor-pointer border-[#bc13fe] font-bold uppercase text-[#bc13fe]
            hover:border-b-2 transition-all"
            >
              Order details
            </h1>
            <div className="mt-4">
              <div className="my-4 flex items-center justify-between">
                <label className="block">Customer name</label>
                <p>{oderDetails?.name}</p>
              </div>
              <div className="my-4 flex items-center justify-between">
                <label className="block">Phone number</label>
                <p>{oderDetails?.phoneNumber}</p>
              </div>
              <div className="my-4 flex items-center justify-between">
                <label className="block">Email</label>
                <p>{oderDetails?.email}</p>
              </div>
              <div className="my-4 flex items-center justify-between">
                <label className="block">Address</label>
                <p>{oderDetails?.address}</p>
              </div>
              <div className="my-4 flex items-center justify-between">
                <label className="block">Payment methods</label>
                <p>{oderDetails?.payments}</p>
              </div>
              <div className="my-4 flex items-center justify-between">
                <label className="block">Order Status</label>
                <p>{oderDetails?.statusOrder}</p>
              </div>
              <div className="my-4 flex items-center justify-between">
                <label className="block">Order Status</label>
                <p>{oderDetails?.isPaid ? "Paid" : "Unpaid"}</p>
              </div>
              <div className="my-4 flex items-center justify-between">
                <label className="block">Time to buy</label>
                <p>{calculateCreatedTime(oderDetails?.createdAt)}</p>
              </div>

              <div className="my-4 flex items-center justify-between">
                <label className="block mb-3">Note</label>
                <p>{oderDetails?.note?.length > 0 ? oderDetails?.note : "Do not have"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[30%] w-full h-[622px] overflow-auto shadow-md">
          <div className="p-4">
            <h1 className="text-[20px] font-semibold">Total order value</h1>
          </div>
          <div>
            {oderDetails?.products?.map((p) => (
              <CartItem key={p.colors + p.memories} cart={p} showQuantity={false} />
            ))}
          </div>
          <div className="w-[100%] bg-amber-400 p-4 text-white">
            <h1 className="text-2xl font-semibold">Summary</h1>
            <div className="flex items-center justify-between mt-4">
              <p className="text-md">Total Products</p>
              <p className="text-md">{oderDetails?.products?.length}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-md">Total</p>
              <p className="text-md">
                <NumericFormat
                  value={oderDetails?.totalOrder}
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

export default OrderDetails;
