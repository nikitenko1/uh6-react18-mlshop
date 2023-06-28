import React from "react";
import { useParams } from "react-router-dom";
import ProductsList from "../components/products/ProductsList";
import Category from "../components/category/Category";

const Product = () => {
  const { category } = useParams();

  return (
    <div className="container mt-20">
      <div className="flex-col md:flex-row flex gap-2 py-4">
        <Category />
        <ProductsList paginate={true} category={category} title="Products" />
      </div>
    </div>
  );
};

export default Product;
