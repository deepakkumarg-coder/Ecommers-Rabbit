import React from "react";
import { Link } from "react-router-dom";
import featuredImage from "../../assets/featured.webp"
function FeaturedCollection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
        {/* Left content */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg text-gray-700 mb-2 font-semibold ">
            Comfort and Style
          </h2>
          <h2 className="text-4xl lg:text-5xl text-gray-700 mb-6 font-bold">
            Apparel made for Everyday Life
          </h2>
          <p className="text-lg text-gray-600 mb-5">
            Discover high Quality,Comfortable Clothing that effortlessly blends,
            fashion and function.Designed to make you look good and feel great
            everday
          </p>
          <Link to={`/collection/all`}>
            <button className="bg-black px-10 py-2 text-center text-white text-lg rounded-lg hover:bg-gray-800 cursor-pointer">
              Shop
            </button>
          </Link>
        </div>
        <div className="lg:w-1/2">
        <img src={featuredImage} alt="Featured section" className=" w-full h-full lg:rounded-tr-3xl lg:rounded-br-3xl"/>
    </div>
      </div>
    </section>
  );
}

export default FeaturedCollection;
