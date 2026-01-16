import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { updateUserStatus } from "../../api/adminApi";

const UserStatus = () => {
  const [userId, setUserId] = useState("");
  const [active, setActive] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserStatus(userId, active);
    alert("User status updated");
  };

  return (
    <DashboardLayout>
      <h2>Activate / Deactivate User</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <br /><br />

        <select
          value={active ? "true" : "false"}
          onChange={(e) => setActive(e.target.value === "true")}
        >
          <option value="true">Activate</option>
          <option value="false">Deactivate</option>
        </select>

        <br /><br />
        <button type="submit">Update Status</button>
      </form>
    </DashboardLayout>
  );
};

export default UserStatus;
