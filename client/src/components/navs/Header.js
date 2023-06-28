import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import { logOut } from "../../redux/slices/userSlice";
import { useOnClickOutside } from "usehooks-ts";

const Header = () => {
  const dropdownRef = useRef(null);
  //   React hook for listening for clicks outside of a specified element (see useRef).
  useOnClickOutside(dropdownRef, () => {
    setShowMenuInfo(false);
  });
  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const [showMenu, setShowMenu] = useState(false);
  const [showMenuInfo, setShowMenuInfo] = useState(false);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    setShowMenu(false);
    setShowMenuInfo(false);
  }, [location.pathname]);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchText.trim()) return;
    navigate(`/search?q=${searchText}`);
    setSearchText("");
  };

  return (
    <div className="py-3 bg-slate-950 shadow-md text-white">
      <div className="flex justify-between items-center container">
        <div className="block lg:hidden" onClick={() => setShowMenu(true)}>
          <i className="bx bx-menu-alt-left text-[30px]"></i>
        </div>
        <Link to="/" className="text-2xl flex items-center ">
          UA You <img className="ml-2 w-[50px] aspect-auto" src="/icon.png" alt="logo" />
        </Link>
        <form
          onSubmit={handleSearch}
          className="w-[300px] hidden items-center rounded-md overflow-hidden h-[40px] lg:flex md:flex"
        >
          <input
            className="w-full h-full py-1 px-3 outline-none flex-1 bg-slate-100"
            placeholder="Search product ..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="px-3 h-full bg-amber-400 flex items-center justify-center cursor-pointer">
            <i className="text-[20px] text-white bx bx-search-alt-2"></i>
          </div>
        </form>
        <div className="flex items-center relative">
          <NavBar showMenu={showMenu} setShowMenu={setShowMenu} />
          <Link to="/cart" className="relative flex items-center">
            <i className="text-[30px] bx bx-cart-alt"></i>
            <p
              className="bg-[#b2071d] text-xs w-[15px] h-[15px] text-white
            flex items-center justify-center rounded-full absolute top-[-6px] right-[0]"
            >
              {cart.length}
            </p>
          </Link>
          {currentUser ? (
            <>
              <div className="flex items-center overflow-hidden ml-6">
                <img
                  onClick={() => setShowMenuInfo(!showMenuInfo)}
                  className="w-[35px] h-[35px] rounded-full object-cover cursor-pointer"
                  src={currentUser.image}
                  alt="showMenuInfo"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={currentUser.name}
                  data-tooltip-offset="30"
                />
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
            </>
          ) : (
            <Link
              to="/auth/login"
              className="ml-6 py-1 px-3 bg-amber-400 text-white rounded-md transition-colors"
            >
              <i
                className="bx bx-log-in-circle text-2xl"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Log In"
                data-tooltip-offset="30"
              ></i>
            </Link>
          )}

          {showMenuInfo && (
            <div
              ref={dropdownRef}
              className="absolute bg-white shadow-md p-4 right-0 bottom-[-120px] z-10 transition-all
            text-slate-950 "
            >
              <p className="py-2 px-3 border-b-2">{currentUser?.name}</p>
              <p className="py-2 px-3 border-b-2">{currentUser?.email}</p>
              <Link to={`/edit-info/${currentUser._id}`} className="py-2 px-3 border-b-2 block">
                Edit Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
