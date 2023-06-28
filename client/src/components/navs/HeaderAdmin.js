import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/slices/userSlice";

const HeaderAdmin = ({ setShowMenu }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center px-3 py-2 border-b-2">
      <div onClick={() => setShowMenu(true)} className="flex items-center lg:hidden">
        <i className="text-[30px] bx bx-menu mr-4"></i>
      </div>
      <div className="flex items-center">
        <i className="text-[30px] bx bx-search"></i>
      </div>
      <div className="flex-1 mx-6">
        <input className="w-full p-2 outline-none" placeholder="Search..." />
      </div>
      <div className="mx-6">
        <button
          onClick={() => dispatch(logOut())}
          className="px-2 bg-amber-400 text-[#b2071d] ml-3 flex items-center justify-center rounded-md"
        >
          <i
            className="bx bx-log-out-circle text-2xl"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Log Out"
            data-tooltip-offset="30"
          ></i>
        </button>
      </div>
      <div className="w-[35px] h-[35px] rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={currentUser.image}
          alt="currentUser"
          data-tooltip-id="my-tooltip"
          data-tooltip-content={currentUser.name}
          data-tooltip-offset="30"
        />
      </div>
    </div>
  );
};

export default HeaderAdmin;
