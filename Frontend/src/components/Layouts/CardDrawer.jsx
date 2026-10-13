import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import CardContents from "../Carts/CardContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function CardDrawer({ drawerOpen, handleDrawerOpen }) {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user.id : null;
  const handleCheckout = () => {
    //This line is supecious
    handleDrawerOpen((prev) => !prev);
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };
  return (
    <div
      className={`fixed top-0 right-0 sm:w-1/2 md:w-[25rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-end p-4">
        <button className="cursor-pointer" onClick={handleDrawerOpen}>
          <IoMdClose className="h-5 w-5" />
        </button>
      </div>
      {/*Cards display */}
      <div className=" flex-grow overflow-y-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {/*Card Components */}
        {cart && cart.products.length > 0 ? (
          <CardContents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Yor Card is Empty</p>
        )}
      </div>

      {/* Footer for checkout */}
      <div className="bottom-0 sticky p-4 bg-white">
        {cart && cart.products.length > 0 && (
          <>
            <button
              type="submit"
              onClick={handleCheckout}
              className="w-full bg-black text-white rounded-lg font-semibold py-3
             hover:bg-slate-800 hover:-translate-y-2
             transition-all duration-300"
            >
              Checkout
            </button>
            <p className="text-sm tracking-tight mb-2 text-gray-500 text-center">
              Shipping , Taxes and Discount codes are calculated at checkout
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default CardDrawer;
