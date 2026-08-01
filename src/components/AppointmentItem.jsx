function AppointmentItem({
  appt,
  editingId,
  newStatus,
  newTime,
  setEditingId,
  setNewStatus,
  setNewTime,
  formatForInput,
  handleUpdate,
  handleDelete,
}) {
  return (
    <>
      <tr>
        <td>
          <span className={`status-badge ${appt.status.toLowerCase()}`}>
            {appt.status}
          </span>
        </td>

        <td>{new Date(appt.appointmentTime).toLocaleString()}</td>

        <td className="table-actions">
          <button
            className="edit-btn"
            onClick={() => {
              setEditingId(appt.id);
              setNewStatus(appt.status);
              setNewTime(formatForInput(appt.appointmentTime));
            }}
          >
            Edit
          </button>

          <button className="delete-btn" onClick={() => handleDelete(appt.id)}>
            Delete
          </button>
        </td>
      </tr>

      {editingId === appt.id && (
        <tr className="edit-row">
          <td colSpan="3">
            <div className="edit-section">
              <div className="edit-field">
                <label>Status</label>

                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              <div className="edit-field">
                <label>Appointment Time</label>

                <input
                  type="datetime-local"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                />
              </div>

              <div className="edit-actions">
                <button
                  className="save-btn"
                  onClick={() => handleUpdate(appt.id)}
                >
                  Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default AppointmentItem;
