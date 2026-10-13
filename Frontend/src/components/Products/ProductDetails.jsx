import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Spin, Alert } from "antd";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProduct,
} from "../../redux/slice/productSlice";
import { addToCart } from "../../redux/slice/cartSlice";
import Loader from "../Common/Loader";

function ProductDetails({ productId }) {
  const { id = "" } = useParams();

  const dispatch = useDispatch();
  const { selectedProducts, loading, error, similarProduct } = useSelector(
    (state) => state.products,
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const [selectedImage, setSelectedImage] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({
    size: "",
    color: "",
    quantity: 1,
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // id from home to params from product

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProduct(productFetchId));
    }
  }, [dispatch, productFetchId]);
  const handleImage = (imObj) => {
    setSelectedImage((prev) => ({
      ...prev,
      ...imObj,
    }));
  };
  const handleOnClick = (e, value) => {
    const { name } = e?.target;
    setSelectedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAdd = (e) => {
    const { name } = e?.target;
    if (name == "minus") {
      setSelectedProduct((prev) => {
        const value = prev?.quantity - 1;
        if (value <= 0) {
          return { ...prev, quantity: 1 };
        } else {
          return { ...prev, quantity: value };
        }
      });
    }

    if (name == "plus") {
      setSelectedProduct((prev) => {
        const value = prev?.quantity + 1;
        if (value <= 0) {
          return { ...prev, quantity: 1 };
        } else {
          return { ...prev, quantity: value };
        }
      });
    }
  };
  const handleAddToCart = () => {
    if (!selectedProduct?.color || !selectedProduct?.size) {
      toast.error("Please Select Color and Size Before Add To Cart", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisabled(true);
    dispatch(
      addToCart({
        productId: productFetchId,
        userId: user?._id || null,
        guestId,
        ...selectedProduct,
      }),
    )
      .then(() => {
        toast.success("Product Added To The Cart", { duration: 1000 });
      })
      .finally(() => {
        setIsButtonDisabled(false);
        setSelectedProduct({
          size: "",
          color: "",
          quantity: 1,
        });
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
  };

  useEffect(() => {
    if (selectedProducts && selectedProducts.images.length > 0) {
      setSelectedImage(selectedProducts?.images[0]);
    }
  }, [selectedProducts]);

  return (
    <div className="">
      <h2 className="text-3xl font-bold text-center">Best Seller</h2>
      <div className="p-6">
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert
            message="Failed to load products"
            description={error}
            type="error"
            showIcon
          />
        ) : (
          selectedProducts && (
            <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg ">
              <div className="flex flex-col md:flex-row ">
                {/* Thumbnail section */}
                <div className=" hidden md:flex flex-col space-y-2 mr-4">
                  {selectedProducts.images.map((product, index) => (
                    <img
                      key={index}
                      src={product?.url}
                      alt={product?.altTeaxt}
                      onClick={() => handleImage(product)}
                      className={` w-20 h-20 rounded-lg cursor-pointer object-cover border  ${selectedImage?.url === product?.url ? "border-black" : "border-gray-300"}`}
                    />
                  ))}
                </div>
                {/* Image Part */}
                <div className="md:w-1/2 mr-4 ">
                  <div className="mb-4 ">
                    <img
                      src={
                        Object.keys(selectedImage).length > 0
                          ? selectedImage?.url
                          : selectedProducts.images[0]?.url
                      }
                      alt={
                        Object.keys(selectedImage).length > 0
                          ? selectedImage?.altTeaxt
                          : selectedProducts.images[0]?.altTeaxt
                      }
                      className="object-cover w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
                <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
                  {selectedProducts.images.map((product, index) => (
                    <img
                      key={index}
                      src={product?.url}
                      alt={product?.altTeaxt}
                      onClick={() => handleImage(product)}
                      className={` w-20 h-20 rounded-lg cursor-pointer object-cover border  ${selectedImage?.url === product?.url ? "border-black" : "border-gray-300"}`}
                    />
                  ))}
                </div>
                <div className="md:w-1/2 md:ml-2">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                    {selectedProducts?.name}
                  </h2>
                  <p className="text-lg text-gray-500 mb-1 line-through">
                    {selectedProducts.originalPrice &&
                      `Rs .${selectedProducts.originalPrice}`}
                  </p>
                  <p className="text-lg text-gray-800 mb-2">
                    {selectedProducts.price && `Rs .${selectedProducts.price}`}
                  </p>
                  <p className="text=gray-600 mb-4">
                    {selectedProducts.description}
                  </p>
                  <div className="mb-4 ">
                    <p className="text-gray-600 ">Color :</p>
                    <div className="flex gap-2 mt-2 ">
                      {selectedProducts.color.map((color, index) => (
                        <button
                          key={index}
                          name="color"
                          onClick={(e) => handleOnClick(e, color)}
                          className={`w-8 h-8 rounded-full ${selectedProduct?.color === color ? "border-4 border-black" : "border-gray-300"}  hover: cursor-pointer`}
                          style={{
                            backgroundColor: color.toLowerCase(),
                            filter: "brightness(0.5)",
                          }}
                        ></button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-600 ">Size :</p>
                    <div className="flex gap-2 mt-2">
                      {selectedProducts.size.map((size, index) => (
                        <button
                          key={index}
                          name="size"
                          onClick={(e) => handleOnClick(e, size)}
                          className={`px-4 py-2 rounded border ${selectedProduct?.size === size ? "bg-black text-white" : ""}  hover: cursor-pointer `}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <p className="text-gray-700">Quantity</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={(e) => handleAdd(e)}
                        name="minus"
                        className="bg-gray-300 px-2 py-1 rounded text-lg"
                      >
                        -
                      </button>
                      <span>{selectedProduct?.quantity || 1}</span>
                      <button
                        name="plus"
                        onClick={(e) => handleAdd(e)}
                        className="bg-gray-300 px-2 py-1 rounded text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className={`w-full rounded bg-black ${isButtonDisabled ? "cursor-not-allowed bg-black/50" : "hover:bg-gray-900"} px-6 py-2 text-white text-md text-center uppercase mb-4`}
                  >
                    {isButtonDisabled ? "Adding ..." : "Add To Cart"}
                  </button>
                  <div className="mt-4 text-gray-700">
                    <h2 className="text-xl font-bold mb-4">
                      Characteristics :
                    </h2>
                    <table className="text-gray-600 text-left w-full text-sm">
                      <tbody>
                        <tr>
                          <td className="py-1">Brand</td>
                          <td className="py-1">{selectedProducts?.brand}</td>
                        </tr>
                        <tr>
                          <td className="py-1">Material</td>
                          <td className="py-1">{selectedProducts?.material}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mt-20">
                <h2 className="text-2xl text-center font-medium mb-4">
                  You may Also Like
                </h2>
                <ProductGrid
                  products={similarProduct}
                  loading={loading}
                  error={error}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
