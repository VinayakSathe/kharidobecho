import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { setAuthState } from "../../store/authSlice";
import logo from "../../assets/Images/kharidobecho-logo.svg";
import {
  loginUser,
  fetchBuyerInfo,
  fetchSellerInfo,
} from "../../store/services/authServices";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginLoading, setLoginLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoginLoading(true);
      const payload = {
        username: formData.email,
        password: formData.password,
      };

      const response = await loginUser(payload);
      console.log("Login Response:", response);

      const token =
        response.accessToken || response.token || response.data?.token || null;

      if (token) {
        localStorage.setItem("token", token);
      }

      // ✅ FIX: Read roles from backend (authorities)
      const roles =
        response.authorities || response.roles || response.data?.roles || [];

      console.log("User Roles:", roles);

      localStorage.setItem("roles", JSON.stringify(roles));

      // ROLE CHECK FIX ✔
      const isBuyer = roles.includes("BUYER");
      const isSeller = roles.includes("SELLER");

      const baseUserId = response.userId;
      if (baseUserId) {
        localStorage.setItem("userId", baseUserId);
      }

      // ========================
      // BUYER LOGIN FLOW
      // ========================
      if (isBuyer) {
        console.log("Hitting Buyer API...");
        const buyerData = await fetchBuyerInfo(baseUserId);

        if (!buyerData) {
          toast.error("Buyer info fetch failed");
          return;
        }

        const buyerUserId = buyerData.userId;
        localStorage.setItem("buyerUserId", buyerUserId);

        dispatch(
          setAuthState({
            token,
            sellerId: null,
            sellerProfile: {
              roles,
              expiresIn: response.expiresIn,
              tokenType: response.tokenType,
              userId: baseUserId,
            },
          })
        );

        toast.success("Login successful");
        navigate("/");
        return;
      }

      // ========================
      // SELLER LOGIN FLOW
      // ========================
      if (isSeller) {
        console.log("Hitting Seller API...");
        const sellerData = await fetchSellerInfo(baseUserId);

        if (!sellerData) {
          toast.error("Seller info fetch failed");
          return;
        }

        const sellerId = sellerData.sellerId;
        localStorage.setItem("sellerId", sellerId);

        dispatch(
          setAuthState({
            token,
            sellerId,
            sellerProfile: {
              roles,
              expiresIn: response.expiresIn,
              tokenType: response.tokenType,
              userId: baseUserId,
            },
          })
        );

        toast.success("Login successful");
        navigate("/dashboard");
        return;
      }

      // NO ROLE FOUND
      toast.error("Unauthorized: No valid role assigned");
    } catch (err) {
      console.error("Login Error:", err);
      const message =
        err?.response?.data?.message ||
        err?.data?.message ||
        err?.message ||
        "Invalid credentials or server error";
      toast.error(message);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT LOGO SIDE */}
      <div className="hidden md:flex w-1/2 bg-white items-center justify-center">
        <img src={logo} alt="Logo" className="w-150 h-100 object-contain" />
      </div>

      {/* RIGHT FORM SIDE */}
      <div className="w-full md:w-1/2 flex flex-col items-center px-8 py-10">
        <h1 className="text-3xl font-semibold text-center">Login</h1>

        <p className="text-gray-500 text-center text-sm mt-3 mb-10 max-w-xs">
          Lorem ipsum dolor sit amet consectetur. Ipsum massa turpis morbi
          platea. Vitae habitant duis.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <label className="block text-gray-700 font-medium mb-1">
            Email address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="mt-5">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-right mt-2">
            <button
              type="button"
              className="text-[#033047] text-sm font-semibold cursor-pointer"
              onClick={() => navigate("/forget-password")}
            >
              Forgot Password?
            </button>
          </div>

          <button
            id="login-btn"
            type="submit"
            disabled={loginLoading}
            className="w-full bg-[#0A2533] text-white py-4 rounded-xl mt-8 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
