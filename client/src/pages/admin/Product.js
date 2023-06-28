import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import FormCreateProduct from "../../components/forms/FormCreateProduct";
import ProductTable from "../../components/table/ProductTable";
import Paginate from "../../components/shared/Paginate";
import FormEditProduct from "../../components/forms/FormEditProduct";

const Product = () => {
  const { products, page, setPage, totalPage } = useSelector((state) => state.product);

  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <div>
              <ProductTable product={products} />
              <Paginate page={page} setPage={setPage} totalPage={totalPage} />
            </div>
          }
        />
        <Route path="add" element={<FormCreateProduct />} />
        <Route path="edit/:id" element={<FormEditProduct />} />
      </Routes>
    </>
  );
};

export default Product;
