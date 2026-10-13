import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function FilterLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 1000,
  });
  const [priceRange, setPriceRange] = useState([1, 100]);
  const category = ["Top Wear", "Bottom Wear"];
  const color = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];
  const sizes = ["XS", "S", "M", "XL", "XXL"];
  const material = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Nylon",
    "Fleece",
    "Viscoss",
  ];
  const brand = [
    "Urban Threads",
    "Modern Fite",
    "Street Style",
    "Fashionista",
    "CricStyle",
  ];
  const genders = ["Men", "Women"];
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params?.category || "",
      color: params?.color || "",
      gender: params?.gender || "",
      size: params?.size?.split(",") || [],
      material: params?.material?.split(",") || [],
      brand: params?.brand?.split(",") || [],
      minPrice: parseInt(params?.minPrice) || 0,
      maxPrice: parseInt(params?.maxPrice) || 100,
    });
    setPriceRange([0, params?.maxPrice || 1000]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newFilter = { ...filters };
    if (type === "checkbox") {
      if (checked) {
        newFilter[name] = [
          ...(newFilter[name] || []).filter((item) => item !== value),
          value,
        ];
      } else {
        newFilter[name] = newFilter[name].filter((item) => item != value);
      }
    } else {
      newFilter[name] = value;
    }
    setFilters(newFilter);
    upParamsUrl(newFilter);
  };

  const upParamsUrl = (newFilter) => {
    const params = new URLSearchParams();
    Object.keys(newFilter).forEach((key) => {
      if (Array.isArray(newFilter[key]) && newFilter[key].length > 0) {
        params.append(key, newFilter[key].join(","));
      } else if (newFilter[key]) {
        params.append(key, newFilter[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params?.toString()}`);
  };
  const handlePriceRange = (e) => {
    const newPrice = e?.target?.value;
    setPriceRange([0, newPrice]);
    const newFilter = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilter);
    upParamsUrl(newFilter);
  };
  return (
    <div className="p-4">
      <h3 className="text-xl font-medium mb-4 text-gray-800"> Filter</h3>
      {/*Category filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Category
        </label>
        {category.map((items, index) => (
          <div key={index} className=" flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={items}
              onChange={handleFilterChange}
              checked={filters?.category === items}
              className="h-4 w-4 mr-2 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{items}</span>
          </div>
        ))}
      </div>

      {/*Gender filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Gender
        </label>
        {genders.map((items, index) => (
          <div key={index} className=" flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={items}
              onChange={handleFilterChange}
              checked={filters?.gender === items}
              className="h-4 w-4 mr-2 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{items}</span>
          </div>
        ))}
      </div>
      {/* Colors */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {color.map((col, index) => (
            <button
              key={index}
              name="color"
              value={col}
              onClick={handleFilterChange}
              className={`w-8 h-8 border border-gray-300 rounded-full transition cursor-pointer hover:scale-105 ${
                filters?.color === col ? "ring-2 ring-blue-500" : ""
              }`}
              style={{
                backgroundColor: col.toLowerCase(),
              }}
            ></button>
          ))}
        </div>
      </div>

      {/*Size filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          size
        </label>
        {sizes.map((items, index) => (
          <div key={index} className=" flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={items}
              onChange={handleFilterChange}
              checked={filters?.size.includes(items)}
              className="h-4 w-4 mr-2 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{items}</span>
          </div>
        ))}
      </div>

      {/*Materials filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Material
        </label>
        {material.map((items, index) => (
          <div key={index} className=" flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={items}
              onChange={handleFilterChange}
              checked={filters?.material.includes(items)}
              className="h-4 w-4 mr-2 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{items}</span>
          </div>
        ))}
      </div>

      {/*Brand filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Brand
        </label>
        {brand.map((items, index) => (
          <div key={index} className=" flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={items}
              onChange={handleFilterChange}
              checked={filters?.brand.includes(items)}
              className="h-4 w-4 mr-2 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{items}</span>
          </div>
        ))}
      </div>

      {/* Pricr Range */}
      <div className="mb-8">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          {" "}
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceRange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>₹0</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}

export default FilterLayout;
