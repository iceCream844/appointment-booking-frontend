import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/dashboard.css";

import Navbar from "../components/Navbar";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentList from "../components/AppointmentList";

import { isTokenValid } from "../utils/auth";
import { logout } from "../services/authService";
import { getCurrentUser } from "../services/userService";

import {
  getAppointments,
  getMyAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../services/appointmentService";

function Dashboard() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [newTime, setNewTime] = useState("");

  const [form, setForm] = useState({
    status: "PENDING",
    appointmentTime: "",
  });

  const formatForInput = (dateStr) => dateStr.slice(0, 16);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const fetchAppointments = async () => {
    try {
      const userRes = await getCurrentUser();
      const user = userRes.data;

      setCurrentUser(user);

      let res;

      if (user.role === "ADMIN") {
        res = await getAppointments();
        setAppointments(res.data.content);
      } else {
        res = await getMyAppointments();
        setAppointments(res.data);
      }
    } catch (err) {
      console.error("Fetch appointments error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createAppointment(form);

      await fetchAppointments();

      setForm({
        status: "PENDING",
        appointmentTime: "",
      });
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateAppointment(id, {
        status: newStatus,
        appointmentTime: newTime,
      });

      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === id
            ? {
                ...appt,
                status: newStatus,
                appointmentTime: newTime,
              }
            : appt,
        ),
      );

      setEditingId(null);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);

      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    if (!isTokenValid()) {
      logout();
      navigate("/");
      return;
    }

    fetchAppointments();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <Navbar currentUser={currentUser} onLogout={handleLogout} />

        <div className="dashboard-header">
          <h1>Appointment Booking System</h1>
          <p>Manage your appointments quickly and easily.</p>
        </div>

        <AppointmentForm
          form={form}
          setForm={setForm}
          handleCreate={handleCreate}
        />

        <AppointmentList
          appointments={appointments}
          editingId={editingId}
          newStatus={newStatus}
          newTime={newTime}
          setEditingId={setEditingId}
          setNewStatus={setNewStatus}
          setNewTime={setNewTime}
          formatForInput={formatForInput}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default Dashboard;
