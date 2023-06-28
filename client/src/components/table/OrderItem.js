import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import ModalEditOder from "../modal/ModalEditOder";
import { useSelector } from "react-redux";

const OderItem = ({ p, index }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  return (
    <tr key={p._id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-black">{index + 1}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-black">{p?.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{p?.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{p?.payments}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            p?.statusOrder === "Confirming"
              ? "bg-green-100 text-green-800"
              : p?.statusOrder === "Confirmed"
              ? "bg-red-100 text-red-800"
              : p?.statusOrder === "Delivery in progress"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {p?.statusOrder}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            p?.isPaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {Boolean(p?.isPaid) ? "Paid" : "Unpaid"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <NumericFormat
          value={p?.totalOrder}
          displayType={"text"}
          thousandSeparator={true}
          suffix={"đ"}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500 cursor-pointer">
        <Link to={`/order-details/${p._id}`}>See details</Link>
      </td>
      {location.pathname === "/admin/oders" ? (
        <td
          onClick={handleShow}
          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500 cursor-pointer"
        >
          Edit
        </td>
      ) : (
        <td className="text-gray-300 px-6 py-4 whitespace-nowrap text-sm font-medium cursor-not-allowed">
          Edit
        </td>
      )}
      {show && <ModalEditOder handleClose={handleClose} data={p} />}
    </tr>
  );
};

export default OderItem;
