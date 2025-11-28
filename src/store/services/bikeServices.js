// import apiClient from "./apiClient";

// export const addBike = async (payload) => {
//   const response = await apiClient.post("/bikes/post", payload, {
//     headers: { "Content-Type": "application/json" },
//   });
//   return response.data;
// };
import apiClient from "./apiClient";

// 📌 CREATE BIKE (JSON)
export const addBike = async (payload) => {
  const response = await apiClient.post("/bikes/post", payload);
  return response.data;
};

// 📌 UPLOAD BIKE IMAGES (MULTIPART)
export const uploadBikeImage = async (formData) => {
  const response = await apiClient.post("/bikes/image/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// 📌 GET IMAGES OF BIKE
export const getBikeImages = async (bikeId) => {
  const response = await apiClient.get(`/bikes/image/get?bikeId=${bikeId}`);
  return response.data;
};

// 📌 DELETE BIKE IMAGE
export const deleteBikeImage = async (imageId) => {
  const response = await apiClient.delete(
    `/bikes/image/delete?imageId=${imageId}`
  );
  return response.data;
};

export const getBikesBySeller = async (sellerId) => {
  const res = await apiClient.get(
    `/bikes/seller/${sellerId}/status/ACTIVE/page/0/size/50`
  );
  return res.data?.content || [];
};

// GET BIKE BY ID
export const getBikeById = async (bikeId) => {
  const res = await apiClient.get(`/bikes/get/${bikeId}`);
  return res.data;
};

// EDIT bike
export const updateBike = async (bikeId, payload) => {
  const res = await apiClient.patch(`/bikes/patch/${bikeId}`, payload);
  return res.data;
};

// DELETE bike
export const deleteBike = async (bikeId) => {
  const res = await apiClient.delete(`/bikes/delete/${bikeId}`);
  return res.data;
};

// GET ALL BIKES (for buyers)
export const getAllBikes = async () => {
  const res = await apiClient.get("/bikes/get");
  return Array.isArray(res.data) ? res.data : [];
};
