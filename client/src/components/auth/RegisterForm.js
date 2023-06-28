import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { addUser } from "../../redux/slices/userSlice";
import { getUserInfo, registerApi } from "../../api/authApi";
import setAuthToken from "../../utils/setAuthToken";
import Error from "../shared/Error";
import { validateForm } from "../../utils/validateForm";
import Loading from "../loading/Loading";

const RegisterForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    comfirm_password: "",
  });
  const { email, password, name, comfirm_password } = data;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateForm(data);
    if (err.length > 0) return toast.error(<Error error={err} />);
    if (password !== comfirm_password) return toast.error("Password does not match!");
    setLoading(true);

    try {
      const res = await registerApi(data);
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
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="text-slate-100 w-full ">
      <div className="my-4 w-full">
        <img className="w-[100px] aspect-auto mx-auto rounded-full" src="/404.png" alt="logo" />
      </div>
      <h1 className="text-2xl font-semibold my-4">Sign Up</h1>
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
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="w-full mt-4">
          <label className="block mb-1" htmlFor="name-input">
            Name
          </label>
          <input
            id="name-input"
            className="w-full p-2 rounded-md outline-none"
            type="text"
            name="name"
            placeholder="Ex: yu you"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full mt-4">
          <label className="block mb-1" htmlFor="password-input">
            Password
          </label>
          <input
            id="password-input"
            className="w-full p-2 rounded-md outline-none"
            type="password"
            name="password"
            placeholder="Ex: 123456A"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full mt-4">
          <label className="block mb-1" htmlFor="comfirm-password-input">
            Comfirm Password
          </label>
          <input
            id="comfirm-password-input"
            className="w-full p-2 rounded-md outline-none"
            type="password"
            name="comfirm_password"
            placeholder="Ex: 123456A"
            value={comfirm_password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button className="mt-8 w-full bg-[#b2071d] hover:opacity-100 opacity-50 p-2 rounded-md text-white">
            Sign Up
          </button>
        </div>
      </form>
      <p className="w-full text-center mt-3">
        Do you already have an account{" "}
        <Link
          className="cursor-pointer border-[#bc13fe] capitalize text-blue-400 hover:border-b-2
          transition-all"
          to="/auth/register"
        >
          Login
        </Link>
      </p>
      {loading && <Loading />}
    </div>
  );
};

export default RegisterForm;
