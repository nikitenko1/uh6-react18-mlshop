import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getUser } from "../api/adminApi";
import { editUser } from "../api/authApi";
import { validateEmail } from "../utils/validateForm";
import { addUser } from "../redux/slices/userSlice";

const Info = () => {
  const { id } = useParams();

  const [info, setInfo] = useState({
    id: "",
    name: "",
    email: "",
    passwordOld: "",
    password: "",
  });

  const { currentUser } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const res = await getUser(id);
      if (res.data.success) {
        setUser(res.data.user);
      }
    })();
  }, [id]);

  useEffect(() => {
    setInfo({ ...info, id: user?._id, name: user?.name, email: user?.email });
  }, [user]);

  const handleOnChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (
      user.name === info.name &&
      user.email === info.email &&
      !info.password.trim() &&
      !info.passwordOld.trim()
    ) {
      return;
    }
    if (!info.name.trim() || !info.email || !validateEmail(info.email)) {
      return toast.error(
        "The information cannot be left blank and the email must be in the correct format!"
      );
    }
    setLoading(true);

    try {
      const res = await editUser({ ...info, _id: info._id });
      if (res.data.success) {
        toast.success("Successfully updated!");
        dispatch(addUser({ ...currentUser, ...info }));
        setUser({ ...user, name: info.name, email: info.email });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="mt-10">
      <div className="container bg-white py-6">
        <h3 className="text-center mb-5 font-semibold text-[30px]">Edit Profile</h3>
        <form onSubmit={handleOnSubmit} className="w-[700px] mx-auto max-w-full p-4">
          <div className="flex items-center">
            <div className="w-[100px] height-[100px] rounded-full relative">
              <img src={user?.image} alt="user" />
              <i
                className="bx bx-edit-alt text-[25px] absolute text-blue-500 right-0 bottom-0
              hover:scale-125"
              ></i>
            </div>
            <div className="ml-5">
              <p className="text-lg font-semibold">{user?.name}</p>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block mb-3 text-gray-600">Customer name</label>
                <input
                  onChange={handleOnChange}
                  className="border outline-none rounded-md w-full py-2 px-3"
                  value={info?.name}
                  name="name"
                />
              </div>
              <div>
                <label className="block mb-3 text-gray-600">Email</label>
                <input
                  onChange={handleOnChange}
                  className="border outline-none rounded-md w-full py-2 px-3"
                  value={info?.email}
                  name="email"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="block mb-3 text-gray-600">Old password</label>
              <input
                onChange={handleOnChange}
                name="passwordOld"
                value={info.passwordOld}
                className="border outline-none rounded-md w-full py-2 px-3"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-3 text-gray-600">New password</label>
              <input
                onChange={handleOnChange}
                name="password"
                value={info.password}
                className="border outline-none rounded-md w-full py-2 px-3"
              />
            </div>
            <button
              disabled={loading}
              className="px-4 py-2 bg-amber-400 rounded-md text-white 
              ring-inset ring-2 hover:ring-[#b2071d] w-full"
            >
              {loading ? "Updating...." : "Update information"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Info;
