import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { RiTwitterXLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io";
function TopBar() {
  return (
    <div className="bg-[#ea2e0e] text-white">
      <div className="container mx-auto flex justify-between py-3 px-4">
        <div className=" hidden md:flex space-x-2">
          <a href="#" className="hover:text-gray-300"></a>
          <TbBrandMeta className="h-5 w-5" />
          <a href="#" className="hover:text-gray-300"></a>
          <IoLogoInstagram className="h-5 w-5" />
          <a href="#" className="hover:text-gray-300"></a>
          <RiTwitterXLine className="h-4 w-4" />
        </div>
        <div className="text-sm text-center flex-grow">
          <span> we ship worldwide - Fast and Reliable shiping </span>
        </div>
        <div className="text-sm hidden md:block">
          <a href="tel :1234567890" className="hover:text-gray-300">
            +91 12345 67890
          </a>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
