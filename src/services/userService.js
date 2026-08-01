import API from "../api/axios";
import {
  getAppointments,
  getMyAppointments,
} from "../services/appointmentService";

export const getCurrentUser = () => API.get("/users/me");

export const getUsers = () => API.get("/users");

export const getDashboardAppointments = async (role) => {
  if (role === "ADMIN") {
    return getAppointments();
  }

  return getMyAppointments();
};
