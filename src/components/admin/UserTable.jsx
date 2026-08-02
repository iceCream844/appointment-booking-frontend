import { useState } from "react";
import UserRow from "./UserRow";
import UserEditModal from "./UserEditModal";
import UserAppointmentModal from "./UserAppointmentModal";
import "../../style/admin.css";

import { updateUser, deleteUser } from "../../services/userService";

function UserTable({ users, refreshUsers }) {
  const [search, setSearch] = useState("");

  // Edit Modal
  const [editingUser, setEditingUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // View Appointment Modal
  const [viewUser, setViewUser] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  // ===========================
  // View
  // ===========================
  const handleView = (user) => {
    setViewUser(user);
    setViewOpen(true);
  };

  // ===========================
  // Edit
  // ===========================
  const handleEdit = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  // ===========================
  // Save
  // ===========================
  const handleSave = async (updatedUser) => {
    try {
      await updateUser(updatedUser.id, {
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });

      alert("User updated successfully.");

      setModalOpen(false);
      setEditingUser(null);

      await refreshUsers();
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Unable to update user.");
    }
  };

  // ===========================
  // Delete
  // ===========================
  const handleDelete = async (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${user.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(user.id);

      alert("User deleted successfully.");

      await refreshUsers();
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Unable to delete user.");
    }
  };

  return (
    <div className="admin-card">
      <div className="table-header">
        <h2>User Management</h2>

        <input
          className="search-input"
          type="text"
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Appointments</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-table">
                No users found.
              </td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </tbody>
      </table>

      {/* Edit User Modal */}
      <UserEditModal
        open={modalOpen}
        user={editingUser}
        onClose={() => {
          setModalOpen(false);
          setEditingUser(null);
        }}
        onSave={handleSave}
      />

      {/* View Appointment Modal */}
      <UserAppointmentModal
        open={viewOpen}
        user={viewUser}
        refreshUsers={refreshUsers}
        onClose={() => {
          setViewOpen(false);
          setViewUser(null);
        }}
      />
    </div>
  );
}

export default UserTable;
