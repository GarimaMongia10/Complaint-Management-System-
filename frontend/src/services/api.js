import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===== Auth APIs =====
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);

// ===== Complaint APIs =====
export const getComplaints = () => api.get("/complaint");
export const createComplaint = (data) => api.post("/complaint", data);
export const updateComplaint = (id, data) =>
  api.put(`/complaint/${id}`, data);
export const deleteComplaint = (id) =>
  api.delete(`/complaint/${id}`);

// ===== Admin APIs =====
export const getReports = () => api.get("/reports");
export const getSettings = () => api.get("/settings");
export const updateSettings = (data) => api.put("/settings", data);

export default api;
