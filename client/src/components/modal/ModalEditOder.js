import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { editOderbyId } from "../../api/orderApi";
import { editOrder } from "../../redux/slices/orderSlice";
import { v4 } from "uuid";

const ModalEditOder = ({ data, handleClose }) => {
  const statusOrder = ["Confirming", "Confirmed"];

  const [oder, setOder] = useState({
    statusOrder: data.statusOrder,
    isPaid: data.isPaid,
  });

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setOder({ ...oder, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await editOderbyId({
        ...data,
        statusOrder: oder.statusOrder,
        isPaid: Boolean(Number(oder.isPaid)),
      });
      if (res.data.success) {
        toast.success("Successfully edited!");
        dispatch(
          editOrder({
            ...data,
            statusOrder: oder.statusOrder,
            isPaid: Boolean(Number(oder.isPaid)),
          })
        );
      }
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Fix failure!");
    }
    setLoading(false);
  };

  return (
    <div
      onClick={handleClose}
      className="fixed top-0 bottom-0 right-0 left-0 overlay flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-[600px] bg-white p-3 rounded-md max-w-full"
      >
        <p className="py-2 px-3">Code orders: {data._id}</p>
        <p className="py-2 px-3">Customer name: {data.name}</p>
        <p className="py-2 px-3">Payments: {data.payments}</p>
        <p className="py-2 px-3">
          Order Status:{" "}
          <select
            onChange={handleOnChange}
            name="statusOrder"
            value={oder.statusOrder}
            className="border p-2 outline-none"
          >
            {statusOrder.map((p) => (
              <option key={v4()} value={p}>
                {p}
              </option>
            ))}
          </select>
        </p>
        <p className="py-2 px-3">
          Payment Status:{" "}
          <select
            onChange={handleOnChange}
            name="isPaid"
            value={Number(oder.isPaid)}
            className="border p-2 outline-none"
          >
            <option value={0}>Unpaid</option>
            <option value={1}>Paid</option>
          </select>
        </p>
        <button
          disabled={loading}
          className="bg-green-600 mt-4 p-2 rounded-md text-white ring-2 hover:ring-[#ffd400]
           transition-all w-3/4  flex justify-center mx-auto"
        >
          {loading ? "Loading..." : "Edit"}
        </button>
      </form>
    </div>
  );
};

export default ModalEditOder;
