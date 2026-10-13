import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbBrandMeta } from "react-icons/tb";
import { RiTwitterXLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import axios from "axios";

function Footer() {
  const [subscriberemail, setSubscriberemail] = useState({
    loading: false,
    email: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubscriberemail((prev) => ({ ...prev, loading: true }));
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/subscribe`,
        {
          email: subscriberemail?.email || "",
        },
      );
      setSubscriberemail({
        loading: false,
        email: "",
      });
    } catch (error) {
      console.log("this is error", error?.message);
      setSubscriberemail({
        loading: false,
        email: "",
      });
    }
  };
  return (
    <footer className=" border-t py-12">
      <div className="container mx-auto  grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        {/* NewsLetter Section */}

        <div>
          <h3 className="text-lg text-gray-800 mb-4">NewsLetter</h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about the New Products andd online offers
          </p>
          <p className="text-gray-500 mb-6 font-medium text-sm">
            Sign up and get 10% off on first order
          </p>
          <form onSubmit={handleSubmit} action="" className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              value={subscriberemail?.email || ""}
              onChange={(e) =>
                setSubscriberemail((prev) => ({
                  ...prev,
                  email: e?.target?.value || "",
                }))
              }
              className="p-3 text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
              required
            />
            <button
              type="submit"
              disabled={subscriberemail?.loading}
              className="bg-black text-sm text-white px-6 py-3 rounded-r-md hover:bg-gray-500 hover:-translate-y-2 transition-all"
            >
              {subscriberemail?.loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {subscriberemail?.loading ? "Subscribing in..." : "Subscribe"}
            </button>
          </form>
        </div>
        {/* Shop Section */}

        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men's top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women's top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Womens's top Wear
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}

        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                FAQ'S
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>
        {/* follow us Section */}
        <div>
          <h3 className=" text-lg text-gray-800 mb-4">Follow Us</h3>
          <div className="flex items-center gap-x-4 mb-6">
            <a
              href="www.facebook.com"
              target="_blank"
              rel="noopner norefferr"
              className="hover:text-gray-400"
            >
              <TbBrandMeta />
            </a>
            <a
              href="www.facebook.com"
              target="_blank"
              rel="noopner norefferr"
              className="hover:text-gray-400"
            >
              <IoLogoInstagram />
            </a>
            <a
              href="www.facebook.com"
              target="_blank"
              rel="noopner norefferr"
              className="hover:text-gray-400"
            >
              <RiTwitterXLine />
            </a>
          </div>
          <p className="text-gray-500">Call us</p>
          <p>
            <FiPhoneCall className="inline-block mr-2" />
            01234 5667
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-5 text-center">
        <p className="text-gray-500 text-sm tracking-tighter">
          @2026 All Rights are Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
