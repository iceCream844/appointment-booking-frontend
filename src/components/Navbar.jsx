function Navbar({ currentUser, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>📅 Appointment Booking System</h2>

        {currentUser && (
          <div className="welcome-section">
            <h3>Welcome back, {currentUser.name}!</h3>

            <span className="role-badge">
              {currentUser.role === "ADMIN" ? "Administrator" : "User"}
            </span>

            <p>{currentUser.email}</p>
          </div>
        )}
      </div>

      <div className="navbar-right">
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
