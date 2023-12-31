import React, { useState, useEffect } from "react";
import { useSearchParams } from "../../hooks/useSearchParams";
import ProductItem from "./ProductItem";
import { getProductsApi } from "../../api/productApi";
import Paginate from "../shared/Paginate";
import Loading from "../loading/Loading";
// import SkeletonVideoCard from "../skeleton/SkeletonVideoCard";
import NoResults from "../shared/NoResults";
import { v4 } from "uuid";

const ProductsList = ({ category, title, paginate, limit }) => {
  const [product, setProduct] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    (async (category) => {
      try {
        setLoading(true);
        const res = await getProductsApi(category, searchParams.get("page"), limit);
        if (res.data.success) {
          setProduct(res.data.products);
          setTotalPage(res.data.totalPage);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })(category);
  }, [category, searchParams.get("page")]);

  if (loading) return <Loading />;
  // if (loading) return <SkeletonVideoCard item={12} />;

  if (product.length === 0) {
    return (
      <>
        <NoResults />
      </>
    );
  }

  return (
    <>
      <div className="flex-1 shadow-sm rounded-sm mb-4">
        <h1 className="font-[20px] bg-white p-2 my-3 rounded-md">{title}</h1>
        {
          <div className="grid lg:grid-cols-5 gap-2 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 w-full">
            {product.map((p) => (
              <ProductItem key={v4()} data={p} />
            ))}
          </div>
        }
        {paginate && <Paginate totalPage={totalPage} />}
      </div>
    </>
  );
};

export default ProductsList;
