import React, { useState } from "react";
import logo from "../../assets/Images/kharidobecho-logo.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../store/services/authServices";

const ROLES = ["USER", "BUYER", "SELLER"];

const Registration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    address: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    role: "BUYER",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.mobileNumber ||
      !formData.address ||
      !formData.role
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setIsLoading(true);
      await registerUser(formData);
      toast.success("Account created successfully! Redirecting to login...");
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.data?.message ||
        err?.message ||
        "Registration failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-white items-center justify-center">
        <img src={logo} alt="Logo" className="w-150 h-100 object-contain" />
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center px-8 py-10">
        <h1 className="text-3xl font-semibold text-center">Create Account</h1>

        <p className="text-gray-500 text-center text-sm mt-3 mb-10 max-w-xs">
          Start your journey with KharidoBecho. Join the marketplace today!
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobileNumber"
              placeholder="Enter mobile number"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Address
            </label>
            <textarea
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              I want to register as a:
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 appearance-none"
            >
              {ROLES.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption.charAt(0) + roleOption.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          <button
            id="register-btn"
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0A2533] text-white py-4 rounded-xl mt-2 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Registration;

