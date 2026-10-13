import React from "react";
import { Link } from "react-router-dom";
import { Spin, Alert } from "antd";

function ProductGrid({ products, loading, error }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-grow">
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
      ) : products.length > 0 ? (
        products.map((product, index) => (
          <Link key={index} to={`/products/${product._id}`} className="block">
            <div className="p-4 bg-white rounded-lg">
              <img
                src={product?.images[0]?.url}
                alt={product?.images[0]?.altText}
                className="object-cover h-full w-full"
              />
            </div>
            <h3 className="text-sm mb-2 pl-4">{product?.name || ""}</h3>
            <p className="text-sm pl-4  text-gray-500 font-medium tracking-tighter">
              ₹ {product.price}
            </p>
          </Link>
        ))
      ) : (
        <p className="text-center text-2xl font-bold">No Products Found</p>
      )}
    </div>
  );
}

export default ProductGrid;
