import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import Layouts from "./pages";
import Auth from "./pages/auth";
import AdminPage from "./pages/admin";
import Loading from "./components/loading/Loading";
import { addUser, logOut } from "./redux/slices/userSlice";
import setAuthToken from "./utils/setAuthToken";
import { getUserInfo } from "./api/authApi";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    // wrap your async call here
    const loadData = async () => {
      try {
        const res = await getUserInfo();
        dispatch(addUser(res.data.user));
      } catch (error) {
        dispatch(logOut());
      }
    }; // then call it here
    loadData();
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.search, location.pathname]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (typeof currentUser === "undefined") return <Loading />;

  return (
    <>
      <Routes>
        <Route path="/*" element={<Layouts />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </>
  );
};

export default App;
