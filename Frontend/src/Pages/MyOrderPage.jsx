import React, { useEffect, useState } from "react";
import { IoHandLeft } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrderDetails, fetchOrders } from "../redux/slice/orderSlice";
import { Alert, Spin } from "antd";

function MyOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 ">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="w-full text-center text-gray-500">
          <thead className="bg-gray-100 text-sm text-gray-500">
            <tr>
              <th className="px-4 py-2 sm:py-3">Image</th>
              <th className="px-4 py-2 sm:py-3">Order</th>
              <th className="px-4 py-2 sm:py-3">CreatedAt</th>
              <th className="px-4 py-2 sm:py-3">ShippingAddress</th>
              <th className="px-4 py-2 sm:py-3">Items</th>
              <th className="px-4 py-2 sm:py-3">Price</th>
              <th className="px-4 py-2 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <Spin size="large" tip="Loading products..." />
              </div>
            ) : error ? (
              <Alert
                message="Failed to load products"
                description={error}
                type="error"
                showIcon
              />
            ) : orders?.length > 0 ? (
              orders?.map((order, index) => (
                <tr
                  onClick={() => handleClick(order._id)}
                  key={index}
                  className=" border-b cursor-pointer hover:border-gray-50"
                >
                  <td className="px-2 py-2 sm:py-4 sm:px-2">
                    <img
                      src={order.orderItems[0]?.image}
                      alt="Order image"
                      className=" mx-auto w-8 h-8 sm:w-12 sm:h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-4 text-gray-900 font-medium whitespace-nowrap">
                    {order._id}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-4">
                    {new Date(order.paidAt).toLocaleDateString()} {""}
                    {new Date(order.paidAt).toLocaleTimeString()}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city} ,${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-4">
                    {order.orderItems.length}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-4">
                    {order.totalPrice}
                  </td>
                  <td className={`px-2 py-2 sm:px-4 sm:py-4 `}>
                    <span
                      className={`${order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-2 py-1 font-medium rounded-lg text-xs sm:text-sm`}
                    >
                      {order.isPaid ? "PAID" : "PENDING"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                  You have no Orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrderPage;
