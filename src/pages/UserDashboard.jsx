import { useEffect, useState } from "react";

import AppointmentForm from "../components/user/AppointmentForm";
import AppointmentList from "../components/user/AppointmentList";

import {
  getMyAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../services/appointmentService";

function UserDashboard() {
  const [appointments, setAppointments] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [newStatus, setNewStatus] = useState("");

  const [newTime, setNewTime] = useState("");

  const [form, setForm] = useState({
    status: "PENDING",
    appointmentTime: "",
  });

  const formatForInput = (dateStr) => dateStr.slice(0, 16);

  const fetchAppointments = async () => {
    try {
      const res = await getMyAppointments();

      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAppointments();
  }, []);

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
      console.error(err);
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
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);

      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
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
    </>
  );
}

export default UserDashboard;
