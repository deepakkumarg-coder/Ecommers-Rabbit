import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  fetchAllUsers,
  removeUser,
  updateUser,
} from "../../redux/slice/adminSclice";
import { Alert, Spin } from "antd";
function UserManagment() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  useEffect(() => {
    document.title = "Admin User | Page";
  }, []);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleInputs = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await dispatch(addUser(formData)).unwrap();
      dispatch(fetchAllUsers());

      {
        /* Resetting Form Data */
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "Customer",
      });
    } catch (error) {
      console.log("this is error", error.meaasge);
    }
  };
  const handleRoleChange = async (id, name, email, role) => {
    await dispatch(updateUser({ id, name, email, role })).unwrap();
    dispatch(fetchAllUsers());
  };
  const handleUserId = (id) => {
    if (window.confirm("are you  sure you want to delete the user")) {
      dispatch(removeUser(id));
    }
  };
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Managment</h1>
      {/* USER Form */}
      <div className="p-6 rounded-xl mb-6 bg-gray-50 shadow-xl">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleInputs}
              className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 ring-gray-200"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Email:
            </label>
            <input
              type="text"
              name="email"
              value={formData?.email}
              onChange={handleInputs}
              className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 ring-gray-200 "
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData?.password}
              onChange={handleInputs}
              className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 ring-gray-200 "
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Role:
            </label>
            <select
              name="role"
              id="role"
              onChange={handleInputs}
              value={formData.role || ""}
              className=" w-full p-2 border rounded-md focus:outline-none focus:ring-2 ring-gray-200"
            >
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 py-2 px-4 text-white rounded hover:bg-green-700 flex justify-between items-center space-x-2"
          >
            <FiPlus />
            <span>Add User</span>
          </button>
        </form>
      </div>
      {/* User Table */}
      <div className="over-x-auto sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className=" bg-gray-50 text-sm uppercase text-gray-700">
            <tr>
              <td className="px-4 py-2">Name</td>
              <td className="px-4 py-2">Email</td>
              <td className="px-4 py-2">Role</td>
              <td className="px-4 py-2">Action</td>
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
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className=" border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">
                    {user?.name}
                  </td>
                  <td className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">
                    {user?.email}
                  </td>
                  <td className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">
                    <select
                      name=""
                      id=""
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(
                          user?._id,
                          user?.name,
                          user?.email,
                          e?.target?.value,
                        )
                      }
                      className="p-2 rounded border border-gray-200 focus:outline-none"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleUserId(user?._id)}
                      className="py-1 px-3 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}> No Users Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagment;
