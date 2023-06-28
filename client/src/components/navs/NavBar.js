import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavBar = ({ showMenu, setShowMenu }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <ul
      className={`transition-all mr-6 lg:flex lg:static lg:bg-transparent lg:w-auto py-4 lg:py-0 items-center
       fixed bg-slate-900 ${
         showMenu ? "left-0" : "left-[-100%]"
       } w-[320px] max-w-full bottom-0 top-0 z-10`}
    >
      <div className="p-2 w-[40px] lg:hidden" onClick={() => setShowMenu(false)}>
        <i className="bx bx-left-arrow-alt text-[30px] text-amber-400 cursor-pointer"></i>
      </div>
      <li onClick={() => setShowMenu(false)} className="mr-3 p-2 lg:p-0">
        <NavLink
          className="p-2 rounded-lg block lg:inline-block hover:ring-slate-100 hover:ring-2"
          to="/"
        >
          Home page
        </NavLink>
      </li>
      <li onClick={() => setShowMenu(false)} className="mr-3 p-2 lg:p-0">
        <NavLink
          className="p-2 rounded-lg block lg:inline-block hover:ring-slate-100 hover:ring-2"
          to="/product?page=1"
        >
          Product
        </NavLink>
      </li>
      {currentUser && (
        <li onClick={() => setShowMenu(false)} className="mr-3 p-2 lg:p-0">
          <NavLink className="p-2 rounded-lg block lg:inline-block" to="/order?page=1">
            Order
          </NavLink>
        </li>
      )}
      {currentUser?.roleId === "admin" && (
        <li onClick={() => setShowMenu(false)} className="mr-3 p-2 lg:p-0">
          <NavLink className="p-2 rounded-lg block lg:inline-block" to="/admin">
            Admin
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavBar;
