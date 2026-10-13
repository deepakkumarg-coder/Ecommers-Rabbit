import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slice/cartSlice";
export default function CardContents({ cart, userId, guestId }) {
  const dispatch = useDispatch();
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 0) {
      dispatch(
        updateCartItemQuantity({
          productId,
          userId,
          guestId,
          quantity: newQuantity,
          size,
          color,
        }),
      );
    }
  };

  const handleRemoveFromCart = (productId, quantity, size, color) => {
    dispatch(removeFromCart({ productId, userId, guestId, size, color }));
  };
  return (
    <div>
      {cart?.products?.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between p-4 border-b"
        >
          <div className="flex items-start ">
            <img
              src={product.image}
              alt="products"
              className="w-20 h-24 object-cover mr-4"
            />
          </div>
          <div className="flex flex-col justify-start">
            <h3>{product?.name}</h3>
            <p className="text-sm text-gray-500">
              size : {product?.size} | color : {product?.color}
            </p>
            <div className="flex items-center mt-4">
              <button
                onClick={() =>
                  handleAddToCart(
                    product.productId,
                    1,
                    product.quantity,
                    product.size,
                    product.color,
                  )
                }
                className="border rounded w-6 h-6 text-sm font-medium"
              >
                +
              </button>
              <span className="mx-4">{product?.quantity}</span>
              <button
                onClick={() =>
                  handleAddToCart(
                    product.productId,
                    -1,
                    product.quantity,
                    product.size,
                    product.color,
                  )
                }
                className="border rounded w-6 h-6 text-sm font-medium"
              >
                -
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>{product?.price}</p>
            <button
              className="cursor-pointer"
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.quantity,
                  product.size,
                  product.color,
                )
              }
            >
              <RiDeleteBin3Line className="h-6 w-6 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
