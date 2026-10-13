import React from "react";
import mensCollection from "../../assets/mens-collection.webp";
import womensCollection from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";
function GenderCollection() {
  return (
    <section className="px-16 py-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <div className="relative flex-1">
          <img
            src={womensCollection}
            alt="womens"
            className="object-cover h-[700px] w-full"
          />
          <div className="absolute bottom-8 left-8 p-4 bg-white/90">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Women's Collection
            </h2>
            <Link
              to="collections/all?gender=Women"
              className=" text-gray-800 underline text-base"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="relative flex-1">
          <img
            src={mensCollection}
            alt="womens"
            className="object-cover h-[700px] w-full"
          />
          <div className="absolute bottom-8 left-8 p-4 bg-white/90">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Men's Collection
            </h2>
            <Link
              to="collections/all?gender=Men"
              className=" text-gray-800 underline text-base"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GenderCollection;
