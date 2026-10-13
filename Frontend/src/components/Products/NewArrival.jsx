import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "sonner";
const NewArrival = () => {
  const [newArrivals, setNewArrivals] = useState([]);

  // Curosel State Variables

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(true);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUporLeave = () => {
    setIsDragging(false);
  };
  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const updateScrollButton = () => {
      setCanScrollLeft(container.scrollLeft > 0);

      setCanScrollRight(
        container.scrollLeft + container.clientWidth <
          container.scrollWidth - 1,
      );
    };

    container.addEventListener("scroll", updateScrollButton);

    // Check the initial scroll state
    updateScrollButton();

    return () => {
      container.removeEventListener("scroll", updateScrollButton);
    };
  }, [newArrivals]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/new-arivals`,
        );

        setNewArrivals(response.data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error.message);
      }
    };

    fetchNewArrivals();
  }, []);
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative ">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest style staright of runway , freshly added to keep
          the wardrobe on the cutting edge of fashion
        </p>
        {/* Scrollable Button Section */}

        <div className="absolute right-0 bottom-[-30px]  flex space-x-2">
          <button
            disabled={!canScrollLeft}
            onClick={() => scroll("left")}
            className={`rounded-full border-2 border-gray-200 p-2 ${
              canScrollLeft
                ? "text-black cursor-pointer"
                : "bg-white text-gray-200 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-xl" />
          </button>
          <button
            disabled={!canScrollRight}
            onClick={() => scroll("right")}
            className={`rounded-full border-2 border-gray-200 p-2 ${
              canScrollRight
                ? "text-black cursor-pointer"
                : "bg-white text-gray-200 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>
      {/* Scrollable Arrival Section */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUporLeave}
        onMouseLeave={handleMouseUporLeave}
        className=" container mx-auto flex overflow-x-auto  hide-scrollbar space-x-6 relative cursor-grab"
      >
        {newArrivals.map((product, index) => (
          <div
            key={index}
            className="relative min-w-[100%] sm:min-w-[50%] md:min-w-[30%]"
          >
            <img
              src={product?.images[0]?.url}
              alt={product?.images[0]?.altText}
              className="w-full h-[500px] object-cover rounded-lg"
              draggable="false"
            />

            <div className="absolute left-0 right-0 bottom-0 rounded-b-lg border-t border-white/30 bg-white/30 backdrop-blur-md p-4">
              <Link to={`/prduct/${product._id}`} className="block">
                <h4 className="font-bold">{product?.name}</h4>
                <p className="mt-1 font-semibold">{product?.price}</p>
              </Link>
              {/* <h2 className="text-xl text-white font-semibold mb-2">
                {product.name}
              </h2>

              <p className="text-sm text-white">{product.price}</p> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrival;
