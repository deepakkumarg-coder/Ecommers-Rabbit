import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slice/orderSlice";
import { Alert, Spin } from "antd";
function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.order);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [id, dispatch]);
  const handleClick = () => {
    navigate("/my-orders");
  };
  return (
    <div className="max-w-7xl mx-auto bg-white p-6 sm:p-6">
      <h1 className=" text-2xl md:text-4xl font-bold mb-8">Order Details</h1>
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
      ) : orderDetails ? (
        <div className="p-4 sm:p-6 rounded-lg border-gray-100 bg-white-50 shadow-2xl">
          {/* Order Details*/}
          <div className="flex justify-between">
            <div>
              <h2 className=" text-lg md:text-xl font-semibold tracking-tighter mb-4">
                Order Id: {orderDetails._id}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(orderDetails?.paidAt).toLocaleDateString("en-GB")}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end sm:mt-0 ">
              <span
                className={`${orderDetails?.isPaid ? "bg-emerald-100 text-emerald-500" : "bg-red-100 text-red-500"} text-base sm:text-sm px-1 py-0.5 rounded-lg mb-4`}
              >
                {orderDetails?.isPaid ? "Approved" : "Rejected"}
              </span>
              <span
                className={`${orderDetails?.isDelivered ? "bg-emerald-100 text-emerald-500" : "bg-amber-100 text-amber-500"} text-base sm:text-sm px-1 py-0.5 rounded-lg mb-4`}
              >
                {orderDetails?.isPaid ? "Delivered" : "Pending"}
              </span>
            </div>
          </div>
          {/* Shipping And Payment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 mt-10">
            <div>
              <h4 className="text-lg font-bold tracking-tighter mb-2">
                Payment Info
              </h4>
              <p>Payment Method Paypal</p>
              <p>Status : {orderDetails.isPaid ? "PAID" : "UNPAID"}</p>
            </div>
            <div className="">
              <h2 className="text-lg font-bold tracking-tighter mb-2">
                Shipping Info
              </h2>
              <p>Shipping Method</p>
              <p>
                Address : {orderDetails.shippingAddress?.city},
                {orderDetails.shippingAddress?.country}
              </p>
            </div>
          </div>
          {/* Products Info */}
          <div className="overflow-x-auto mt-10">
            <h4 className="text-lg font-semibold tracking-tighter mb-4">
              Products
            </h4>
            <table className="min-w-full text-gray-500 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <td className=" px-4 py-2">Name</td>
                  <td className=" px-4 py-2">Unit Price</td>
                  <td className=" px-4 py-2">Quantity</td>
                  <td className=" px-4 py-2">Total</td>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((order, index) => (
                  <tr key={index} className="border-b">
                    <td className="flex items-center px-4 py-2">
                      <img
                        src={order.image}
                        alt={order?.name}
                        className="w-12 h-12 object-cover rounded-lg mr-4"
                      />
                      <Link
                        to={`/products/${order.productId}`}
                        className="text-blue-500 hover:underline cursor-pointer"
                      >
                        {order?.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 ">{order.price}</td>
                    <td className="px-4 py-2 ">{order.quantity}</td>
                    <td className="px-4 py-2 ">{orderDetails.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={handleClick}
            className="group mt-4 bg-black text-white text-lg px-4 py-2 rounded-lg flex items-center gap-2 transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              Go Back
            </span>
          </button>
        </div>
      ) : (
        <div className="w-full h-50 bg-gray-50 shadow-2xl rounded-lg flex justify-center items-center">
          <h1 className="text-2xl font-bold "> No Data</h1>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
