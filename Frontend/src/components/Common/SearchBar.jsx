import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  fetchProductsByFilter,
  setFilters,
} from "../../redux/slice/productSlice";
function SearchBar() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleSearchToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setFilters({ search }));
    dispatch(fetchProductsByFilter({ search }));
    navigate(`/collections/all?search=${search}`)
    setIsOpen((prev) => !prev);
  };
  return (
    <div
      className={`flex justify-center items-center w-full transition-all duration-300 ${isOpen ? " absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSubmit}
          className="relative flex justify-center items-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="search"
              value={search}
              onChange={(e) => setSearch(e?.target?.value)}
              className="bg-gray-100 w-full px-4 pl-2 pr-12 py-2 rounded-lg focus:outline-none placeholder:text-gray-700 "
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray=800"
            >
              <HiMagnifyingGlass className="h-6 w-6 cursor-pointer" />
            </button>
          </div>
          <button
            type="button"
            className="absolute right-2 top-1/2  transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <HiMiniXMark onClick={handleSearchToggle} className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <HiMagnifyingGlass
          onClick={handleSearchToggle}
          className="h-6 w-6 cursor-pointer"
        />
      )}
    </div>
  );
}

export default SearchBar;
