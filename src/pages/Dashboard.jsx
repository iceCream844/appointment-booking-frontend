import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../style/dashboard.css";

import Navbar from "../components/Navbar";

import AdminDashboard from "../components/admin/AdminDashboard";
import UserDashboard from "./UserDashboard";

import { logout } from "../services/authService";
import { getCurrentUser } from "../services/userService";
import { isTokenValid } from "../utils/auth";

function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!isTokenValid()) {
      logout();
      navigate("/");
      return;
    }

    const loadUser = async () => {
      try {
        const res = await getCurrentUser();

        setCurrentUser(res.data);
      } catch (err) {
        console.error(err);

        logout();

        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <Navbar currentUser={currentUser} onLogout={handleLogout} />

        {currentUser.role === "ADMIN" ? <AdminDashboard /> : <UserDashboard />}
      </div>
    </div>
  );
}

export default Dashboard;
