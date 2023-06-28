import React from "react";
import { useSelector } from "react-redux";
import Paginate from "../../components/shared/Paginate";
import OrderTable from "../../components/table/OrderTable";

const Order = () => {
  const { order, totalPageOrder } = useSelector((state) => state.order);

  return (
    <div>
      <OrderTable order={order} />
      <Paginate totalPage={totalPageOrder} />
    </div>
  );
};

export default Order;
