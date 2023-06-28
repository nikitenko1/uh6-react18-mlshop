import React, { useEffect, useState } from "react";
import { useSearchParams } from "../hooks/useSearchParams";
import Loading from "../components/loading/Loading";
import { getMyOrderApi } from "../api/orderApi";
import OrderTable from "../components/table/OrderTable";
import Paginate from "../components/shared/Paginate";

const Order = () => {
  const [order, setOrder] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getMyOrderApi(searchParams.get("page"));
        if (res.data.success) {
          setOrder(res.data.order);
          setTotalPage(res.data.totalPage);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [searchParams.get("page")]);

  return (
    <>
      <div className="mt-10">
        <div className="container">
          <OrderTable order={order} />
          <Paginate totalPage={totalPage} />
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default Order;
