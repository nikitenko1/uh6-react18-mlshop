import React from "react";
import Banner from "../components/banner/Banner";
import ProductsList from "../components/products/ProductsList";
import Title from "../components/shared/Title";

const Home = () => {
  return (
    <>
      <Title title={"UA You - logistics and related services"} />
      <div className="container">
        <Banner />
        <ProductsList category="Phone" title="Mobile phone" limit={5} />
        <ProductsList category="Laptop" title="Laptop" limit={5} />
        <ProductsList category="Watch" title="Clock" limit={5} />
        <ProductsList category="Tablet" title="Tablet" limit={5} />
      </div>
    </>
  );
};

export default Home;
