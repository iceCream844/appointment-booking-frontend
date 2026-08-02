function UserRow({ user, onView, onEdit, onDelete }) {
  return (
    <tr>
      <td>{user.id}</td>

      <td>{user.name}</td>

      <td>{user.email}</td>

      <td>
        <span className={user.role === "ADMIN" ? "role-admin" : "role-user"}>
          {user.role}
        </span>
      </td>

      <td>{user.appointments?.length ?? 0}</td>

      <td className="action-cell">
        <button className="view-btn" onClick={() => onView(user)}>
          View
        </button>

        <button className="edit-btn" onClick={() => onEdit(user)}>
          Edit
        </button>

        <button className="delete-btn" onClick={() => onDelete(user)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default UserRow;
