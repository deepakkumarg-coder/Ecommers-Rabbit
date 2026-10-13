import React, { useEffect } from "react";
import MyOrderPage from "./MyOrderPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/authSlice";
import { clearCart } from "../redux/slice/cartSlice";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Profile Page";
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-6 space-y-6 md:space-y-0">
          {/* Left section */}
          <div className="w-full md:w-1/3 lg:w-1/4  p-6 rounded-lg shadow-md">
            <h1 className="text-2xl md:text-3xl mb-4 font-bold">{user.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{user.email}</p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 px-4 py-2 text-white rounded hover:bg-red-500"
            >
              Logout
            </button>
          </div>
          {/*Right Section */}
          <div className="w-full md:w-2/3 lg:w-3/4  ">
            <MyOrderPage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
