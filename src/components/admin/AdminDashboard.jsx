import { useEffect, useState } from "react";

import DashboardStats from "./DashboardStats";
import UserTable from "./UserTable";
import AppointmentList from "../user/AppointmentList";

import { getUsers } from "../../services/userService";
import { getAppointments } from "../../services/appointmentService";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [userRes, appointmentRes] = await Promise.all([
        getUsers(),
        getAppointments(),
      ]);

      setUsers(userRes.data.content);
      setAppointments(appointmentRes.data.content);
    } catch (err) {
      console.error("Admin Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <>
      <DashboardStats users={users} appointments={appointments} />

      <UserTable users={users} refreshUsers={fetchDashboard} />
    </>
  );
}

export default AdminDashboard;
