function AppointmentForm({ form, setForm, handleCreate }) {
  return (
    <div className="card">
      <h3>Create Appointment</h3>

      <form onSubmit={handleCreate}>
        <div className="form-group">
          <label>Status</label>

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
          >
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Appointment Time</label>

          <input
            type="datetime-local"
            value={form.appointmentTime}
            onChange={(e) =>
              setForm({
                ...form,
                appointmentTime: e.target.value,
              })
            }
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="create-btn">
            Create Appointment
          </button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm;
