import React from "react";
import { Link, NavLink } from "react-router-dom";

const SideBar = ({ showMenu, setShowMenu }) => {
  return (
    <div
      className={`w-[250px] h-screen px-3 py-6 lg:static lg:block fixed top-0 bottom-0 ${
        showMenu ? "left-0" : "left-[-100%]"
      } transition-all z-20  bg-amber-400 text-white`}
    >
      <Link to="/" className="text-[35px] flex items-center logo">
        Dashboard
      </Link>
      <ul className="mt-6">
        <li onClick={() => setShowMenu(false)} className="mb-3">
          <NavLink
            activeclassname="active"
            to="dashboard"
            className={"text-md flex items-center p-2 rounded-md"}
          >
            <i className="bx bx-tachometer text-2xl mr-4"></i> DashBoard
          </NavLink>
        </li>
        <li onClick={() => setShowMenu(false)} className="mb-3">
          <NavLink
            activeclassname="active"
            to="products?page=1"
            className={"text-md flex items-center p-2 rounded-md"}
          >
            <i className="bx bx-code-alt text-2xl mr-4"></i> Products
          </NavLink>
        </li>
        <li onClick={() => setShowMenu(false)} className="mb-3">
          <NavLink
            activeclassname="active"
            to="users?page=1"
            className={"text-md flex items-center p-2 rounded-md"}
          >
            <i className="bx bx-user text-2xl mr-4"></i> Users
          </NavLink>
        </li>
        <li onClick={() => setShowMenu(false)} className="mb-3">
          <NavLink
            activeclassname="active"
            to="oders?page=1"
            className={"text-md flex items-center p-2 rounded-md"}
          >
            <i className="bx bx-barcode text-2xl mr-4"></i> Order
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
