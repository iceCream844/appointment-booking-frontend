import API from "../api/axios";
import {
  getAppointments,
  getMyAppointments,
} from "../services/appointmentService";

export const getCurrentUser = () => API.get("/users/me");

export const getUsers = () => API.get("/users");

export const register = (data) => API.post("/users", data);

// Dashboard Helper
export const getDashboardAppointments = async (role) => {
  if (role === "ADMIN") {
    return getAppointments();
  }

  return getMyAppointments();
};

export const updateUser = (id, data) => API.put(`/users/${id}`, data);

export const deleteUser = (id) => API.delete(`/users/${id}`);
