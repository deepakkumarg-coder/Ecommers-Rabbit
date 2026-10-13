import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layouts/UserLayout";
import Home from "./Pages/Home";
import { Toaster } from "sonner";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import CollectionPage from "./Pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Carts/Checkout";
import OrderConfirmationPage from "./Pages/OrderConfirmationPage";
import OrderDetails from "./Pages/OrderDetails";
import MyOrderPage from "./Pages/MyOrderPage";
import { AdminLayout } from "./components/Admin/AdminLayout";
import AdminPages from "./Pages/AdminPages";
import UserManagment from "./components/Admin/UserManagment";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import ProtuctedRoute from "./components/Common/ProtuctedRoute";
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="collections/:collection"
              element={<CollectionPage />}
            />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route
              path="order-confirmation"
              element={<OrderConfirmationPage />}
            />
            <Route path="order-details/:id" element={<OrderDetails />} />
            <Route path="my-orders" element={<MyOrderPage />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtuctedRoute role="admin">
                <AdminLayout />
              </ProtuctedRoute>
            }
          >
            <Route index element={<AdminPages />}></Route>
            <Route path="users" element={<UserManagment />}></Route>
            <Route path="products" element={<ProductManagement />}></Route>
            <Route path="orders" element={<OrderManagement />}></Route>
            <Route
              path="products/manage"
              element={<EditProductPage />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
