import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInfo, loginAPi } from "../../api/authApi";
import setAuthToken from "../../utils/setAuthToken";
import { addUser } from "../../redux/slices/userSlice";
import Loading from "../loading/Loading";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await loginAPi(data);

    if (res.data.success) {
      localStorage.setItem("token", res.data.token);

      setAuthToken(res.data.token);
      const users = await getUserInfo();

      if (users.data.success) {
        dispatch(addUser(users.data.user));
      }
      setLoading(false);
      toast.success(res.data.message);
    }
    try {
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      className="text-slate-100 w-full overflow-y-hidden scrollbar-thin
    scrollbar-thumb-gray-800"
    >
      <div className="my-4 w-full">
        <img className="w-[100px] aspect-auto mx-auto rounded-full" src="/404.png" alt="logo" />
      </div>
      <h1 className="text-2xl font-semibold my-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full">
          <label className="block mb-1" htmlFor="email-input">
            Email
          </label>
          <input
            required
            id="email-input"
            className="w-full p-2 rounded-md outline-none"
            type="email"
            name="email"
            placeholder="EX: ua-you..@gmail.com"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="w-full mt-4">
          <label className="block mb-1" htmlFor="password-input">
            Password
          </label>
          <input
            required
            id="password-input"
            className="w-full p-2 rounded-md outline-none"
            type="password"
            name="password"
            placeholder="Ex: 123456A"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="mt-8 w-full bg-[#b2071d] hover:opacity-100 opacity-50 p-2 rounded-md text-white">
            Sign In
          </button>
        </div>
      </form>
      <p className="w-full text-center mt-3">
        Do not have an account{" "}
        <Link
          className="cursor-pointer border-[#bc13fe] capitalize text-blue-400 hover:border-b-2
              transition-all"
          to="/auth/register"
        >
          Register
        </Link>
      </p>
      {loading && <Loading />}
    </div>
  );
};

export default LoginForm;
