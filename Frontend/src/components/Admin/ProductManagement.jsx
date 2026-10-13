import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fertchAdminProducts,
  removeAdminProduct,
} from "../../redux/slice/adminproductSlice";
import { FiPlus } from "react-icons/fi";
import { Alert, Spin } from "antd";
import Loader from "../Common/Loader";
function ProductManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector(
    (state) => state.adminproduct,
  );

  useEffect(() => {
    document.title = "Admin Product | Page";
  }, []);

  useEffect(() => {
    dispatch(fertchAdminProducts());
  }, [dispatch]);

  const handleUserId = async (id) => {
    try {
      if (window.confirm("are you  sure you want to delete the Product")) {
        await dispatch(removeAdminProduct(id)).unwrap();
        dispatch(fertchAdminProducts());
      }
    } catch (error) {
      console.log("this is error", error.message);
    }
  };
  const handleClick = () => {
    navigate("manage?mode=create");
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <div className="mt-2 mb-4 flex flex-col md:flex-row justify-end">
        <button
          type="submit"
          onClick={handleClick}
          className="bg-green-500 py-2 px-4 text-white rounded hover:bg-green-700 flex justify-center items-center cursor-pointer space-x-2"
        >
          <FiPlus />
          <span>Create Product</span>
        </button>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-gray-500 text-left">
          <thead className="bg-gray-100 uppercase text-xs text-gray-700">
            <tr>
              <th className="py-3 px-4">S.NO</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
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
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-3 px-4 text-gray-900">{index + 1}</td>
                  <td className="py-3 px-4 text-gray-900">{product.name}</td>
                  <td className="py-3 px-4 text-gray-900">{product.price}</td>
                  <td className="py-3 px-4 text-gray-900">{product.sku}</td>
                  <td className="py-3 px-4">
                    <Link
                      to={`manage?id=${product._id}&mode=edit`}
                      className="bg-yellow-500 text-white py-1 px-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      {" "}
                      EDIT
                    </Link>
                    <button
                      onClick={() => handleUserId(product._id)}
                      className="bg-red-500 p-1 text-white rounded hover:bg-red-800"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center align-middle h-20 ">
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

export default ProductManagement;
