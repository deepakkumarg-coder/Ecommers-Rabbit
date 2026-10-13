import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSideBar from "./AdminSideBar";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const toggleSideBar = () => {
    setIsSideBarOpen((prev) => !prev);
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative border">
      {/* Mobile NavBar */}
      <div className="flex md:hidden bg-gray-900 p-2 text-white z-20">
        <button onClick={toggleSideBar}>
          <FaBars size={24} />
        </button>
        <h2 className="text-xl font-medium ml-4">Admin Dashboard</h2>
      </div>
      {isSideBarOpen && (
        <div
          onClick={toggleSideBar}
          className="fixed inset-0 bg-black/50 md:hidden"
        ></div>
      )}
      {/* Desktop Side Bar */}
      <div
        className={`bg-gray-900 w-64 min-h-screen absolute text-white  md:relative transform ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:static md:block`}
      >
        {/* SideBar Component */}
        <AdminSideBar/>
      </div>
      <div className="flex-grow p-6 overflow-auto">
        <Outlet/>
      </div>
    </div>
  );
};
