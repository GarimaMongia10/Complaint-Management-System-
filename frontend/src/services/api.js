import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Complaint APIs
export const createComplaint = (data) => api.post("/complaint", data);
export const getComplaints = () => api.get("/complaint");
export const updateComplaint = (id, data) =>
  api.put(`/complaint/${id}`, data);
export const deleteComplaint = (id) =>
  api.delete(`/complaint/${id}`);

export default api;
