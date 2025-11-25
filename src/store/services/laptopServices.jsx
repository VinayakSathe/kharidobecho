import axios from "axios";
 
const API = import.meta.env.VITE_BASE_URL || "http://localhost:8087";
 
// -----------------------------
// ⭐ GET ALL LAPTOPS
// -----------------------------
export const getAllLaptops = async () => {
  const res = await axios.get(`${API}/api/laptops/getAll`, {
    headers: { Accept: "application/json" },
  });
 
  return (
    res?.data?.data?.content || // pageable
    res?.data?.content ||
    res?.data?.data ||
    res?.data ||
    []
  );
};
 
// -----------------------------
// ⭐ GET LAPTOPS BY STATUS + SELLER
// -----------------------------
export const getLaptopsByStatus = async (sellerId, status) => {
  const res = await axios.get(
    `${API}/api/laptops/getByDealerIdAndStatus?sellerId=${sellerId}&status=${status}`,
    {
      headers: { Accept: "application/json" },
    }
  );
 
  return (
    res?.data?.data?.content || res?.data?.content || res?.data?.data || []
  );
};
 
// -----------------------------
// ⭐ GET LAPTOP BY ID
// -----------------------------
export const getLaptopById = async (id) => {
  const res = await axios.get(`${API}/api/laptops/getById?laptop_id=${id}`, {
    headers: { Accept: "application/json" },
  });
 
  return res?.data?.data || res.data;
};
 
// -----------------------------
// ⭐ UPDATE LAPTOP
// -----------------------------
export const updateLaptop = async (laptopId, payload) => {
  const res = await axios.patch(
    `${API}/api/laptops/update?laptopId=${laptopId}`,
    payload,
    {
      headers: { Accept: "application/json" },
    }
  );
 
  return res.data;
};
 
// -----------------------------
// ⭐ DELETE LAPTOP
// -----------------------------
export const deleteLaptop = async (id) => {
  const res = await axios.delete(`${API}/api/laptops/delete?laptopId=${id}`, {
    headers: { Accept: "application/json" },
  });
 
  return res.data;
};