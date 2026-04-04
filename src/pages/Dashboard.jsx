import { useEffect, useState } from "react";
import API from "../api/axios";
import { isTokenValid } from "../utils/auth";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/appointments/${id}`);
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await API.put(`/appointments/${id}`, {
        status: newStatus,
        // keep existing time (important)
        appointmentTime: appointments.find((a) => a.id === id).appointmentTime,
      });

      // update UI
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === id ? { ...appt, status: newStatus } : appt,
        ),
      );

      setEditingId(null);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const statusStyle = {
    PENDING: { color: "orange" },
    APPROVED: { color: "green" },
    CANCELLED: { color: "red" },
    COMPLETED: { color: "blue" },
  };

  useEffect(() => {
    if (!isTokenValid()) {
      console.log("Token expired or missing");
      localStorage.removeItem("token");
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        // get current user
        const userRes = await API.get("/users/me");
        const user = userRes.data;

        let res;

        if (user.role === "ADMIN") {
          res = await API.get("/appointments");
          setAppointments(res.data.content);
        } else {
          res = await API.get("/appointments/my");
          setAppointments(res.data);
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt.id}>
              <strong>
                <span style={statusStyle[appt.status]}>{appt.status}</span>
              </strong>
              <br />
              {new Date(appt.appointmentTime).toLocaleString()}
              <br />

              <button onClick={() => handleDelete(appt.id)}>Delete</button>

              <button
                onClick={() => {
                  setEditingId(appt.id);
                  setNewStatus(appt.status);
                }}
              >
                Edit
              </button>

              {Number(editingId) === Number(appt.id) && (
                <>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="CANCELLED">CANCELLED</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>

                  <button onClick={() => handleUpdate(appt.id)}>Save</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
