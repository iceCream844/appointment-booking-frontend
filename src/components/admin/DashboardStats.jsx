import "../../style/admin.css";

function DashboardStats({ users, appointments }) {
  const totalUsers = users.length;

  const totalAppointments = appointments.length;

  const pending = appointments.filter(
    (appt) => appt.status === "PENDING",
  ).length;

  const approved = appointments.filter(
    (appt) => appt.status === "APPROVED",
  ).length;

  const completed = appointments.filter(
    (appt) => appt.status === "COMPLETED",
  ).length;

  const cancelled = appointments.filter(
    (appt) => appt.status === "CANCELLED",
  ).length;

  return (
    <div className="stats-container">
      <div className="stat-card stats-users">
        <h3>Total Users</h3>
        <h1>{totalUsers}</h1>
      </div>

      <div className="stat-card stats-appointments">
        <h3>Total Appointments</h3>
        <h1>{totalAppointments}</h1>
      </div>

      <div className="stat-card stats-pending">
        <h3>Pending</h3>
        <h1>{pending}</h1>
      </div>

      <div className="stat-card stats-approved">
        <h3>Approved</h3>
        <h1>{approved}</h1>
      </div>

      <div className="stat-card stats-completed">
        <h3>Completed</h3>
        <h1>{completed}</h1>
      </div>

      <div className="stat-card stats-cancelled">
        <h3>Cancelled</h3>
        <h1>{cancelled}</h1>
      </div>
    </div>
  );
}

export default DashboardStats;
