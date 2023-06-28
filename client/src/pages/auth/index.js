import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
import { useSelector } from "react-redux";
import { useSearchParams } from "../../hooks/useSearchParams";

const Auth = () => {
  const { currentUser } = useSelector((state) => state.user);

  const searchParams = useSearchParams();

  if (currentUser) {
    return <Navigate to={searchParams.get("redirect") || "/"} />;
  }
  return (
    <div className="flex items-center h-screen container overflow-auto">
      <div className="h-[550px] flex justify-between w-full rounded-lg">
        <div className="flex-1 bg-[#dff9fb] hidden md:block relative">
          <img
            src="https://res.cloudinary.com/dvpy1nsjp/image/upload/v1678812526/cld-sample-5.jpg"
            className="w-full h-full object-cover"
            alt=""
          />

          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md">
            <Link
              className="text-center text-lg font-semibold text-[#b2071d]  bg-slate-950 py-2 px-3 block
             hover:opacity-100 opacity-50"
              to="/"
            >
              Back to home page
            </Link>
          </div>
        </div>
        <div
          className="bg-slate-950 p-6 flex flex-1 items-center
        overflow-y-scroll scrollbar-thin
        scrollbar-thumb-slate-500 scrollbar-thumb-rounded-full"
        >
          <Routes>
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Auth;
