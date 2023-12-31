import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/private/PrivateRoute";
import Info from "./Info";
import Search from "./Search";
import Cart from "./Cart";
import Product from "./Product";
import ProductDetails from "./ProductDetails";
import HomePage from "./Home";
import CheckOut from "./CheckOut";
import ThankYou from "./ThankYou";
import Order from "./Order";
import OrderDetails from "./OrderDetails";
import NotFound from "./NotFound";
import Header from "../components/navs/Header";
import Footer from "../components/navs/Footer";

const Layouts = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:category" element={<Product />} />
        <Route path="/product/details/:id" element={<ProductDetails />} />
        <Route
          path="/check-out"
          element={
            <PrivateRoute>
              <CheckOut />
            </PrivateRoute>
          }
        />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route
          path="/order"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />
        <Route path="/order-details/:id" element={<OrderDetails />} />
        <Route
          path="/edit-info/:id"
          element={
            <PrivateRoute>
              <Info />
            </PrivateRoute>
          }
        />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Layouts;
