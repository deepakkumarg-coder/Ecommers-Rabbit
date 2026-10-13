import React from "react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
} from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slice/cartSlice";

function AdminSideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };
  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-medium">
          Rabbit
        </Link>
        <h2></h2>
      </div>
      <h2 className="text-xl font-medium text-center mb-6">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="users"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-500 hover:bg-gray-700 hover:text-white px-4 py-3 rounded flex items-center space-x-2"
          }
        >
          <FaUser />
          <span>User</span>
        </NavLink>
        <NavLink
          to="products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-500 hover:bg-gray-700 hover:text-white px-4 py-3 rounded flex items-center space-x-2"
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="orders"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-500 hover:bg-gray-700 hover:text-white px-4 py-3 rounded flex items-center space-x-2"
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-500 hover:bg-gray-700 hover:text-white px-4 py-3 rounded flex items-center space-x-2"
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 flex flex-row space-x-2 px-3 py-2 items-center justify-center text-white rounded"
      >
        <FaSignOutAlt />
        <span>Log out</span>
      </button>
    </div>
  );
}

export default AdminSideBar;
