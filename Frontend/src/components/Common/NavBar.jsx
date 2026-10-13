import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CardDrawer from "../Layouts/CardDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaSignInAlt } from "react-icons/fa";
const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const cartItemCount =
    cart.products.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const handleDrawerOpen = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleNavDrawerOpen = () => {
    setNavDrawerOpen((prev) => !prev);
  };
  return (
    <>
      <nav className="container flex items-center justify-between  mx-auto px-4 py-6">
        <div>
          <Link to="/" className="text-2xl font-medium">
            Rabbit
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link
            to="collections/all?gender=Men"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="/collections/all?gender=Women"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="/collections/all?category=Top Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="/collections/all?category=Bottom Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bottom Wear
          </Link>
        </div>
        {/* Icons  */}
        <div className="flex items-center space-x-4">
          {/*User Icon */}
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block bg-black text-white text-sm px-2 rounded"
            >
              Admin
            </Link>
          )}
          {user && (
            <Link to="/profile" className="hover:text-black">
              <HiOutlineUser className="h-6 w-6 text-gray-700 cursor-pointer" />
            </Link>
          )}
          {/* Shopping Icon */}
          <button
            onClick={handleDrawerOpen}
            className="relative hover:text-black cursor-pointer "
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700 " />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 bg-[#ea2e0e] rounded-full px-2 py-0.5 text-white text-xs">
                {cartItemCount}
              </span>
            )}
          </button>
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          {!user && location.pathname !== "/login" && (
            <Link to="/login" className="hover:text-black">
              <FaSignInAlt className="h-6 w-6 text-gray-700 cursor-pointer" />
            </Link>
          )}
          <button onClick={handleNavDrawerOpen} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CardDrawer drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />
      {navDrawerOpen && (
        <div
          className={`fixed top-0 left-0 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${navDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-end p-4">
            <button className="cursor-pointer" onClick={handleNavDrawerOpen}>
              <IoMdClose className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">
            <h5 className="text-xl font-semibold mb-4">Menu</h5>
            <nav className="space-y-4">
              <Link
                to="/collections/all?gender=Men"
                onClick={handleNavDrawerOpen}
                className="text-gray-500 hover:text-black block"
              >
                Men
              </Link>
              <Link
                to="/collections/all?gender=Women"
                onClick={handleNavDrawerOpen}
                className="text-gray-500 hover:text-black block"
              >
                Women
              </Link>
              <Link
                to="/collections/all?category=Top Wear"
                onClick={handleNavDrawerOpen}
                className="text-gray-500 hover:text-black block"
              >
                Top Wear
              </Link>
              <Link
                to="/collections/all?category=Bottom Wear"
                onClick={handleNavDrawerOpen}
                className="text-gray-500 hover:text-black block"
              >
                Bottom Wear
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
