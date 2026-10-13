import React from "react";
import { HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
function FeaturedSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Feature 1 */}
        <div className="flex flex-col items-center ">
          <div className="p-4 mb-4 rounded-full">
            <HiShoppingBag className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2">Free Shipping</h4>
          <p className="tracking-tighter text-sm text-gray-600">
            On all other Rs 100
          </p>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <div className="p-4 mb-4 rounded-full">
            <HiArrowPathRoundedSquare className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2">30 Days Return</h4>
          <p className="tracking-tighter text-sm text-gray-600">
            Money back guarantee
          </p>
        </div>
        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <div className="p-4 mb-4 rounded-full">
            <HiOutlineCreditCard className="text-xl" />
          </div>
          <h4 className="tracking-tighter mb-2">Secured Checkout</h4>
          <p className="tracking-tighter text-sm text-gray-600">
            100% secured chekout
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeaturedSection;
