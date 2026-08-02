import { useState } from "react";

import "../../style/admin.css";

import {
  updateAppointment,
  deleteAppointment,
} from "../../services/appointmentService";

function UserAppointmentModal({ open, user, onClose, refreshUsers }) {
  const [editingId, setEditingId] = useState(null);

  const [newStatus, setNewStatus] = useState("");

  const [newTime, setNewTime] = useState("");

  if (!open || !user) {
    return null;
  }

  const appointments = user.appointments || [];

  const formatForInput = (date) => {
    return date.slice(0, 16);
  };

  const handleEdit = (appointment) => {
    setEditingId(appointment.id);
    setNewStatus(appointment.status);
    setNewTime(formatForInput(appointment.appointmentTime));
  };

  const handleSave = async (appointment) => {
    try {
      await updateAppointment(appointment.id, {
        status: newStatus,
        appointmentTime: newTime,
      });

      alert("Appointment updated successfully.");

      setEditingId(null);

      await refreshUsers();
      onClose();
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Unable to update appointment.");
    }
  };

  const handleDelete = async (appointment) => {
    const confirmed = window.confirm(`Delete appointment #${appointment.id}?`);

    if (!confirmed) return;

    try {
      await deleteAppointment(appointment.id);

      alert("Appointment deleted successfully.");

      await refreshUsers();
      onClose();
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Unable to delete appointment.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal modal-large">
        <div className="modal-header">
          <div>
            <h2>{user.name}'s Appointments</h2>

            <p>{user.email}</p>
          </div>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {appointments.length === 0 ? (
          <div className="empty-table">This user has no appointments.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>

                <th>Status</th>

                <th>Appointment Time</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>

                  <td>
                    {editingId === appointment.id ? (
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                      >
                        <option value="PENDING">PENDING</option>

                        <option value="APPROVED">APPROVED</option>

                        <option value="COMPLETED">COMPLETED</option>

                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    ) : (
                      <span
                        className={`status-badge ${appointment.status.toLowerCase()}`}
                      >
                        {appointment.status}
                      </span>
                    )}
                  </td>

                  <td>
                    {editingId === appointment.id ? (
                      <input
                        type="datetime-local"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                      />
                    ) : (
                      new Date(appointment.appointmentTime).toLocaleString()
                    )}
                  </td>

                  <td className="action-cell">
                    {editingId === appointment.id ? (
                      <>
                        <button
                          className="save-btn"
                          onClick={() => handleSave(appointment)}
                        >
                          Save
                        </button>

                        <button
                          className="cancel-btn"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(appointment)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(appointment)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserAppointmentModal;
