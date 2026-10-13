import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function SortOption() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleOptionChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };
  return (
    <div className="flex items-center justify-end">
      <select
        id="sort"
        onChange={handleOptionChange}
        value={searchParams.sortBy || ""}
        className="p-2 border rounded-md focus:outline-none"
      >
        <option value="">Default</option>
        <option value="priceAsc">Price : Low to High</option>
        <option value="priceDsc">Price : High to Low</option>
        <option value="popularity">Popurality</option>
      </select>
    </div>
  );
}

export default SortOption;
