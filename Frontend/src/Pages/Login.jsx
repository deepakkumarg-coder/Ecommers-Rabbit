import React, { useEffect, useState } from "react";
import loginImg from "../assets/login.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { mergeCart } from "../redux/slice/cartSlice";
function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckout = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckout ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckout ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, dispatch, navigate, isCheckout]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser(formFields)).unwrap();
      toast.success("Login successful!");
      setFormFields({
        email: "",
        password: "",
      });

    } catch (err) {
      toast.error(
        typeof err === "string"
          ? err
          : err?.message || "Login failed. Please try again.",
      );
    }
  };
  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex border">
      <div className="w-full md:w-1/2 flex flex-col  justify-center items-center p-8 md:p-12 ">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 bg-white rounded-lg border-1 border-gray-200 shadow-lg "
        >
          <div className="flex justify-center mb-6 ">
            <h2 className="text-xl font-medium">Rabbit</h2>
          </div>
          <h2 className="text-2xl text-center font-bold mb-6"> hey Here </h2>
          <p className="text-center mb-6">
            Enter your username and password to login
          </p>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="">
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formFields?.email}
              onChange={(e) => handleChange(e)}
              className="w-full p-2 rounded border"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="">
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formFields?.password}
              onChange={(e) => handleChange(e)}
              className="w-full p-2 rounded border"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-black p-2 text-sm font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}

            {loading ? "Signing in..." : "Sign In"}
          </button>
          <p className="text-sm mt-6 text-center space-x-2">
            Don't have an account ?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-600 mr-2"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={loginImg}
            alt="LoginImage"
            className="  h-[750px] w-full object-center"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
