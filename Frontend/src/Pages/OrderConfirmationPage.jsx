import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/slice/cartSlice";
import { useNavigate } from "react-router-dom";
function OrderConfirmationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  useEffect(() => {
    document.title = "Oerder Confirmation Page";
  }, []);

  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
    } else {
      navigate("my-orders");
    }
  }, [checkout, dispatch, navigate]);

  const calculateEstimatedDelivery = (date) => {
    const orderDate = new Date(date);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString("en-GB");
  };
  return (
    <div className="max-w-4xl mx-auto bg-white p-6">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You For Order !
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg  bg-gray-50 shadow-2xl border-gray-100">
          <div className="flex justify-between mb-10">
            {/* Order Id and Date */}
            <div>
              <h2 className="text-xl font-bold">Order Id:</h2>
              <p className="text-gray-500">
                Order Date:
                {new Date(checkout?.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
            {/* Estimated Delivery */}
            <div className="">
              <p className="text-emerald-700 text-sm">
                Estimated Delivery :
                {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>
          {/* Product Display section */}
          <div className="mb-10">
            {checkout.checkoutItems.map((item, index) => (
              <div key={item?.productId} className="flex justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="w-15 h-15 object-cover rounded mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-bold tracking-tighter">
                      {item?.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {item?.color} | {item.size}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-base font-semibold tracking-tighter">
                    SAR {item?.price}
                  </h2>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/2 flex flex-col md:flex-row justify-between items-start min-h-40">
            <div>
              <h2 className="text-base font-semibold tracking-tighter">
                Payment
              </h2>
              <p className="text-sm text-gray-500">PayPal</p>
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tighter mb-2">
                Delivery
              </h2>
              <p className="text-sm text-gray-500">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-sm text-gray-500">
                {checkout.shippingAddress.city},{" "}
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderConfirmationPage;
