import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrder,
  updateAdminOrder,
} from "../../redux/slice/adminorderSlice";
import { Alert, Spin } from "antd";
import Loader from "../Common/Loader";

function OrderManagement() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.adminorder);

  
  useEffect(() => {
    document.title = "Admin Order | Page";
  }, []);

  useEffect(() => {
    dispatch(fetchAllOrder());
  }, [dispatch]);
  const handleStatusChange = async (id, status) => {
    await dispatch(updateAdminOrder({ id, status })).unwrap();

    dispatch(fetchAllOrder());
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="text-gray-700 uppercase text-sm bg-gray-100">
            <tr>
              <th className="py-3 px-4">Order Id:</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Loader />
            ) : error ? (
              <Alert
                message="Failed to load products"
                description={error}
                type="error"
                showIcon
              />
            ) : orders.length > 0 ? (
              orders.map((order, index) => (
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 whitespace-nowrap">{order._id}</td>
                  <td className="py-3 px-4 whitespace-nowrap uppercase">
                    {order.user.name}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {order.totalPrice}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <select
                      name="status"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order?._id, e?.target?.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-sm rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 block"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Canceled">Canceled</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onChange={() =>
                        handleStatusChange(order._id, "Delivered")
                      }
                      className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      {" "}
                      Marked As Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center align-middle h-20 ">
                  <h1 className="text-2xl font-bold"> No Product Data</h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderManagement;
