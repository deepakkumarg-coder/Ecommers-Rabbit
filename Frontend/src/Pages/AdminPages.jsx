import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllOrder } from "../redux/slice/adminorderSlice";
import { fertchAdminProducts } from "../redux/slice/adminproductSlice";
import { Alert, Spin } from "antd";
import Loader from "../components/Common/Loader";

function AdminPages() {
  const dispatch = useDispatch();
  const {
    products,
    loading: productloading,
    error: producterror,
  } = useSelector((state) => state.adminproduct);
  const {
    orders,
    totalOrders,
    totalSales,
    loading: orderloading,
    error: ordererror,
  } = useSelector((state) => state.adminorder);

  useEffect(() => {
    dispatch(fetchAllOrder());
    dispatch(fertchAdminProducts());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Link to={"/admin"} className="block ">
        <h1 className="text-3xl font-bold mb-6 cursor-pointer">
          Admin Dashboard
        </h1>
      </Link>
      {productloading || orderloading ? (
        <Loader />
      ) : producterror ? (
        <>
          <Alert
            message="Failed to load products"
            description={`Error in loading the Products Error:${producterror}`}
            type="error"
            showIcon
          />
        </>
      ) : ordererror ? (
        <Alert
          message="Failed to load products"
          description={`Error in loading the Products Error:${ordererror}`}
          type="error"
          showIcon
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg shadow-md">
            <h1 className="text-xl font-semibold tracking-tighter">Revenue</h1>
            <p className="text-2xl">₹ {Number(totalSales || 0).toFixed(2)}</p>
          </div>
          <div className="p-4 rounded-lg shadow-md">
            <h1 className="text-xl font-semibold tracking-tighter">
              Total Orders
            </h1>
            <p className="text-2xl">{totalOrders}</p>
            <Link to="/admin/orders" className="hover:underline text-blue-500">
              Manage Order
            </Link>
          </div>
          <div className="p-4 rounded-lg shadow-md">
            <h1 className="text-xl font-semibold tracking-tighter">
              Total Products
            </h1>
            <p className="text-2xl">{products.length}</p>
            <Link to="/admin/orders" className="hover:underline text-blue-500">
              Manage Product
            </Link>
          </div>
        </div>
      )}
      <div className="mt-6">
        <h1 className="text-2xl font-bold mb-4">Recent Order</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-50 text-sm uppercase text-gray-700">
              <tr>
                <td className="px-4 py-3">order id</td>
                <td className="px-4 py-3">user</td>
                <td className="px-4 py-3">total price</td>
                <td className="px-4 py-3">status</td>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    key={index}
                  >
                    <td className="p-4 ">{order._id}</td>
                    <td className="p-4 ">{order.user.name}</td>
                    <td className="p-4 ">{order.totalPrice.toFixed(2)}</td>
                    <td className="p-4 ">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-gray-500 text-center p-6 text-lg font-semibold"
                  >
                    {/* <Empty description={"No Order Record found"}/> */}
                    No Recent Order Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPages;
