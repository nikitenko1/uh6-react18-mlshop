import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSearchParams } from "../../hooks/useSearchParams";
import Loading from "../../components/loading/Loading";
import SideBar from "../../components/navs/SideBar";
import { addUsers, setTotalPageUsers, setTotalUsers } from "../../redux/slices/adminSlice";
import { getAllUsers } from "../../api/adminApi";
import { getProductsApi } from "../../api/productApi";
import { addProduct, setTotalPageProducts, setTotalProduct } from "../../redux/slices/productSlice";
import { getAllOrderApi } from "../../api/orderApi";
import { addOrder, setTotalOrder, setTotalPageOrder } from "../../redux/slices/orderSlice";
import HeaderAdmin from "../../components/navs/HeaderAdmin";
import DashBoard from "./DashBoard";
import Order from "./Order";
import Product from "./Product";
import Users from "./Users";

const AdminPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [showMenu, setShowMenu] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  // getAllUsers
  useEffect(() => {
    // wrap your async call here
    const loadData = async () => {
      try {
        const res = await getAllUsers(searchParams.get("page"));
        if (res.data.success) {
          dispatch(addUsers(res.data.users));
          dispatch(setTotalPageUsers(res.data.totalPage));
          dispatch(setTotalUsers(res.data.totalUsers));
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    // then call it here
    loadData();
  }, [searchParams.get("page")]);

  // getAllProducts
  useEffect(() => {
    // wrap your async call here
    const loadData = async () => {
      try {
        const res = await getProductsApi("All", searchParams.get("page"));
        if (res.data.success) {
          dispatch(addProduct(res.data.products));
          dispatch(setTotalPageProducts(res.data.totalPage));
          dispatch(setTotalProduct(res.data.totalProducts));
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    // then call it here
    loadData();
  }, [searchParams.get("page")]);

  // getAllOrders
  useEffect(() => {
    // wrap your async call here
    const loadData = async () => {
      try {
        const res = await getAllOrderApi(searchParams.get("page"));
        if (res.data.success) {
          dispatch(addOrder(res.data.order));
          dispatch(setTotalOrder(res.data.totalOrder));
          dispatch(setTotalPageOrder(res.data.totalPage));
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    // then call it here
    loadData();
  }, [searchParams.get("page")]);

  if (typeof currentUser === "undefined") return <Loading />;
  if (currentUser?.roleId !== "admin") return <Navigate to="/" />;
  if (!currentUser) return <Navigate to="/" />;

  return (
    <div className="flex">
      <SideBar setShowMenu={setShowMenu} showMenu={showMenu} />
      <div className="flex-1 h-[100vh]">
        <HeaderAdmin setShowMenu={setShowMenu} />
        {showMenu && (
          <div
            onClick={() => setShowMenu(false)}
            className="fixed top-0 bottom-0 right-0 left-0 bg-black opacity-50 z-10 transition-opacity"
          ></div>
        )}
        <Routes>
          <Route
            path=""
            element={
              <div className="h-[100%] flex items-center justify-center">
                <h1 className="text-xl font-bold text-center text-slate-900">
                  Welcome to the admin page of UA You is a private Ukrainian production and trade
                  company
                </h1>
              </div>
            }
          />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="products/*" element={<Product />} />
          <Route path="users/*" element={<Users />} />
          <Route path="oders/*" element={<Order />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
