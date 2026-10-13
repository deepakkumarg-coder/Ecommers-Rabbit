import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterLayout from "../components/Products/FilterLayout";
import SortOption from "../components/Products/SortOption";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilter } from "../redux/slice/productSlice";
function CollectionPage() {
  const { collection } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const sideRef = useRef(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const togglesideBar = () => {
    setIsSideBarOpen((prev) => !prev);
  };
  const handleClickOutSide = (e) => {
    if (sideRef.current && !sideRef.current.contains(e.target)) {
      setIsSideBarOpen(false);
    }
  };
  const searchParamsString = searchParams.toString();

useEffect(() => {
  const queryParams = Object.fromEntries(
    new URLSearchParams(searchParamsString).entries()
  );

  dispatch(
    fetchProductsByFilter({
      collection,
      ...queryParams,
    })
  );
}, [dispatch, collection, searchParamsString]);

  // Handle fabars toggle
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    // Clean Up function
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter */}
      <button
        onClick={togglesideBar}
        className="lg:hidden flex p-2 justify-center items-center border"
      >
        <FaFilter className="mr-2" />
        Filter
      </button>
      {/*Filter Side bar */}
      <div
        ref={sideRef}
        className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} bg-white fixed inset-y-0 left-0 w-54 overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 shrink-0`}
      >
        <FilterLayout />
      </div>
      <div className="flex-grow p-4 ">
        <h2 className="text-2xl uppercase mb-4"> All Collection</h2>
        {/* Sort Options */}
        <SortOption />
        {/*Product Grid */}       
        <ProductGrid products={product} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default CollectionPage;
