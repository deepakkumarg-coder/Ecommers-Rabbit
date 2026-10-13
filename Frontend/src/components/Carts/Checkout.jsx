import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Alert, Spin } from "antd";
import { createCheckout } from "../../redux/slice/checkoutSlice";
function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [chekoutTd, setCheckOutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (!cart || cart?.products?.length === 0) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreatCheckout = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        }),
      ).unwrap();

      if (res?._id) {
        setCheckOutId(res._id);
      }
    } catch (error) {
      console.error("Checkout creation failed:", error);
    }
  };
  const handleSuccessPayment = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${chekoutTd}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      if (response.status === 200) {
        await handleFinalizeCheckout(chekoutTd);
      }
    } catch (error) {
      console.log("This is error Catch", error.message);
    }
  };
  const handleFinalizeCheckout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${chekoutTd}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      console.log("this is status", response);

      if (response.status === 201) {
        navigate("/order-confirmation");
      } else {
        console.log("This is error");
      }
    } catch (error) {
      console.log("This is error Catch", error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 tracking-tighter px-6 py-10">
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
      ) : cart && cart?.products.length > 0 ? (
        <>
          <div className="rounded-lg bg-white shadow-2xl p-6 border border-gray-100">
            <h2 className="text-2xl uppercase mb-6">Checkout</h2>
            <form onSubmit={handleCreatCheckout} action="">
              <h3 className="text-lg mb-4">Contact Details</h3>
              <div className="mb-4">
                <label htmlFor="" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  value={user ? user.email : ""}
                  className="w-full rounded border border-gray-200 p-2"
                  disabled
                />
              </div>
              <h3 className="text-lg mb-4">Delivery</h3>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="" className="block text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={shippingAddress?.firstName}
                    onChange={handleInputs}
                    className="w-full rounded border border-gray-200 p-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="" className="block text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={shippingAddress?.lastName || ""}
                    onChange={handleInputs}
                    className="w-full rounded border border-gray-200 p-2"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="" className="block text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={shippingAddress?.address}
                  onChange={handleInputs}
                  className="w-full p-2 rounded border border-gray-200"
                  required
                />
              </div>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="" className="block text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress?.city}
                    onChange={handleInputs}
                    className="w-full rounded border border-gray-200 p-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="" className="block text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={shippingAddress?.postalCode || ""}
                    onChange={handleInputs}
                    className="w-full rounded border border-gray-200 p-2"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="" className="block text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={shippingAddress?.country}
                  onChange={handleInputs}
                  className="w-full p-2 rounded border border-gray-200"
                  required
                />
              </div>{" "}
              <div className="mb-4">
                <label htmlFor="" className="block text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={shippingAddress?.phoneNumber}
                  onChange={handleInputs}
                  className="w-full p-2 rounded border border-gray-200"
                  required
                />
              </div>
              <div className="mt-6">
                {!chekoutTd ? (
                  <button
                    type="submit"
                    className=" w-full bg-black text-white rounded py-3 text-center"
                  >
                    Checkout
                  </button>
                ) : (
                  <div>
                    <h3 className="text-lg mb-4">Pay with PayPal</h3>
                    {/* Pay with Paypal */}
                    <PayPalButton
                      amount={cart?.totalPrice}
                      onSuccess={handleSuccessPayment}
                      onError={(err) => {
                        alert("Payment Failed Please Try Again");
                      }}
                    />
                  </div>
                )}
              </div>
            </form>
          </div>
          {/* Right Section */}
          <div className="bg-gray-50  rounded p-6">
            <h3 className="text-lg mb-4"> Order Summary</h3>
            <div className="border-t  border-gray-300 py-4 mb-4">
              {cart?.products?.map((product, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between py-2 border-b border-gray-300"
                >
                  <div className="flex items-start">
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="w-20 h-24 object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-md">{product?.name}</h3>
                      <p className="text-gray-500">Size : {product?.size}</p>
                      <p className="text-gray-500">Color : {product?.color}</p>
                      <p className="text-gray-500">
                        Price : {Number(product?.price ?? 0).toFixed(2)} |
                        Quantity : {product?.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800 text-xl">
                    ₹ {(product?.price * product?.quantity).toString()}
                  </p>
                </div>
              ))}
              <div className="flex justify-between items-center text-lg mt-4">
                <p>Subtotal :</p>
                <p>{cart.totalPrice}</p>
              </div>
              <div className="flex justify-between items-center text-lg mt-4 ">
                <p>Shipping :</p>
                <p>Free</p>
              </div>
              <div className="flex justify-between items-center text-lg border-t border-gray-300 mt-4 pt-4">
                <p>Total :</p>
                <p>{cart.totalPrice}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center">No Card Data</p>
      )}
      {/*LEft Side Form section */}
    </div>
  );
}

export default Checkout;
