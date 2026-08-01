import AppointmentItem from "./AppointmentItem";

function AppointmentList({
  appointments,
  statusStyle,
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
  if (appointments.length === 0) {
    return <p>No appointments found.</p>;
  }

  return (
    <>
      <h3>Appointment List</h3>

      <table className="appointment-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Appointment Time</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((appt) => (
            <AppointmentItem
              key={appt.id}
              appt={appt}
              statusStyle={statusStyle}
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
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AppointmentList;
