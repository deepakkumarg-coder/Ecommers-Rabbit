import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slice/productSlice";
import {
  createAdminProducts,
  removeAdminProductImage,
  updateAdminProducts,
} from "../../redux/slice/adminproductSlice";
import { RxCross2 } from "react-icons/rx";
import { Alert, Spin } from "antd";

function EditProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const mode = searchParams.get("mode") || "edit";
  const { selectedProducts, loading, error } = useSelector(
    (state) => state.products,
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    size: [],
    color: [],
    collections: "",
    material: "",
    images: [],
  });

  const [isImageUpload, setIsImageUplaoding] = useState(false);

  useEffect(() => {
    if (mode === "edit") {
      dispatch(fetchProductDetails(id));
    }
  }, [id, dispatch, mode]);

  useEffect(() => {
    if (selectedProducts && mode === "edit") {
      setProductData(selectedProducts);
    }
  }, [selectedProducts]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    if ((name === "price" || name === "countInStock") && value < 0) {
      return;
    }
    setProductData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      setIsImageUplaoding(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setProductData((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          { url: response.data.imageUrl, altText: "image" },
        ],
      }));
      setIsImageUplaoding(false);
    } catch (error) {
      console.log("Error Message", error.message);
      setIsImageUplaoding(false);
    }
  };
  const handleRemoveImage = async (id, imageUrl) => {
    await dispatch(removeAdminProductImage({ id, imageUrl })).unwrap();
    dispatch(fetchProductDetails(id));
  };
  const hamdlSubmit = async (e) => {
    try {
      e.preventDefault();
      if (mode === "edit") {
        await dispatch(updateAdminProducts({ id, productData })).unwrap();
      } else {
        await dispatch(createAdminProducts(productData)).unwrap();
      }
      setProductData({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        size: [],
        color: [],
        collections: "",
        material: "",
        images: [],
      });
      navigate("/admin/products");
    } catch (error) {
      console.log("Error Message", error.message);
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-6 rounded-md shadow-2xl">
      <h2 className="text-3xl font-bold mb-6">
        {" "}
        {mode === "edit" ? "Edit Products" : "Create Products"}
      </h2>
      {/*Form Data */}
      <div>
        {loading || isImageUpload ? (
          <div className="flex justify-center items-center py-16">
            <Spin size="large" tip="Loading products..." />
          </div>
        ) : error ? (
          <div className="py-10">
            <Alert
              message="Failed to load products"
              description={error}
              type="error"
              showIcon
            />
          </div>
        ) : selectedProducts || mode != "edit" ? (
          <form action="" onSubmit={hamdlSubmit}>
            <div className="mb-6">
              <label htmlFor="" className="block mb-2 font-semibold">
                Product Name:
              </label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputs}
                className="w-full px-2 py-1 border border-gray-200 focus:outline-none rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="" className="block mb-2 font-semibold">
                Description:
              </label>
              <textarea
                type="text"
                name="description"
                value={productData.description}
                onChange={handleInputs}
                row={4}
                className="w-full px-2 py-1 border border-gray-200 focus:outline-none rounded-md"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="" className="block mb-2 font-semibold">
                Price:
              </label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputs}
                className="w-full px-2 py-1 border border-gray-200 focus:outline-none rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="" className="block mb-2 font-semibold">
                Count in Stock:
              </label>
              <input
                type="number"
                name="countInStock"
                value={productData.countInStock}
                onChange={handleInputs}
                className="w-full px-2 py-1 border border-gray-200 focus:outline-none rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="" className="block mb-2 font-semibold">
                SKU:
              </label>
              <input
                type="text"
                name="sku"
                value={productData.sku}
                onChange={handleInputs}
                className="w-full px-2 py-1 border border-gray-200 focus:outline-none rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="" className="block mb-2 font-semibold">
                Brand:
              </label>
              <input
                type="text"
                name="brand"
                value={productData.brand}
                onChange={handleInputs}
                className="w-full px-2 py-1 border border-gray-200 focus:outline-none rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="" className="block mb-2 font-semibold">
                Category:
              </label>
              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleInputs}
                className="w-full px-2 py-1 border border-gray-200 focus:outline-none rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="" className="block mb-2 font-semibold">
                Material:
              </label>
              <input
                type="text"
                name="material"
                value={productData.material}
                onChange={handleInputs}
                className="w-full px-2 py-1 border border-gray-200 focus:outline-none rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="" className="block mb-2 font-semibold">
                Collection:
              </label>
              <input
                type="text"
                name="collections"
                value={productData.collections}
                onChange={handleInputs}
                className="w-full px-2 py-1 border border-gray-200 focus:outline-none rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="" className="block mb-2 font-semibold">
                Sizes (comma-separated):
              </label>
              <input
                type="text"
                name="size"
                value={productData.size.join(",")}
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    size: e.target.value.split(",").map((val) => val.trim()),
                  }))
                }
                className="w-full px-2 py-1 border border-gray-200 focus:outline-none rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="" className="block mb-2 font-semibold">
                Color (comma-separated):
              </label>
              <input
                type="text"
                name="color"
                value={productData.color.join(",")}
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    color: e.target.value.split(",").map((val) => val.trim()),
                  }))
                }
                className="w-full px-2 py-1 border border-gray-200 focus:outline-none rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="" className="block mb-2 font-semibold">
                Upload File
              </label>
              <input
                id="file"
                type="file"
                name="file"
                onChange={handleFile}
                required={productData?.images?.length === 0}
                className="block 
              w-full text-sm text-gray-900
               file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:bg-blue-600 file:text-white
               file:cursor-pointer
               hover:file:bg-blue-700"
              />
              <div className="flex flex-wrap gap-4 mt-4">
                {productData.images.map((img, index) => (
                  <div
                    key={img.url || index}
                    className="relative w-20 h-20 group"
                  >
                    <img
                      src={img.url}
                      alt={img.altText || "Product image"}
                      className="w-full h-full object-cover rounded-md shadow-md bo"
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(id, img.url)}
                      className="absolute -top-2 -right-2
                               bg-red-600 text-white rounded-full p-1
                                opacity-0 cursor-pointer group-hover:opacity-100
                                 transition-opacity duration-200"
                      aria-label="Remove image"
                    >
                      <RxCross2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-2 rounded-md hover:bg-green-600"
              >
                {mode === "edit" ? "Update Product" : "Create Product"}
              </button>
            </div>
          </form>
        ) : (
          <p> No Products Found</p>
        )}
      </div>
    </div>
  );
}

export default EditProductPage;
