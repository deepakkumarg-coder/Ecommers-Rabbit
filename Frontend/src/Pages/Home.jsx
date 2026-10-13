import React, { useEffect, useState } from "react";
import Hero from "../components/Layouts/Hero";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrival from "../components/Products/NewArrival";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturedSection from "../components/Products/FeaturedSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilter } from "../redux/slice/productSlice";
import axios from "axios";
import Loader from "../components/Common/Loader";

function Home() {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const [bestSeller, setBestSeller] = useState(null);

  useEffect(() => {
    document.title = "Home Page";
  }, []);

  
  useEffect(() => {
    dispatch(
      fetchProductsByFilter({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      }),
    );

    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/best-seller`,
        );
        setBestSeller(response.data);
      } catch (error) {
        console.log("Error", error.message);
      }
    };

    // Best Seller
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrival />
      {bestSeller ? <ProductDetails productId={bestSeller._id} /> : <Loader />}

      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">
          Top Women's Wear
        </h2>
        <ProductGrid products={product} loading={loading} error={error} />
      </div>
      <FeaturedCollection />
      <FeaturedSection />
    </div>
  );
}

export default Home;
