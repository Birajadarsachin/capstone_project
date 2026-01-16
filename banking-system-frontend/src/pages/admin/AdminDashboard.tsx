import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAllUsers, type User } from "../../api/adminApi";
import PeopleIcon from "@mui/icons-material/People";
import PersonCheckIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import WorkIcon from "@mui/icons-material/Work";
import PsychologyIcon from "@mui/icons-material/Psychology";

const StatCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) => (
  <Paper sx={{ p: 3, borderRadius: 2 }}>
    <Stack direction="row" spacing={2} alignItems="center">
      {icon}
      <Box>
        <Typography variant="h6" fontWeight={600}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Stack>
  </Paper>
);

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.active).length;
  const inactiveUsers = users.filter((u) => !u.active).length;
  const rms = users.filter((u) => u.role === "RELATIONSHIP_MANAGER").length;
  const analysts = users.filter((u) => u.role === "ANALYST").length;

  return (
    <DashboardLayout>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700}>
          Admin Dashboard
        </Typography>
        <Typography color="text.secondary">
          Manage users, roles, and system access
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: 2,
          mb: 4,
        }}
      >
        <StatCard
          label="Total Users"
          value={totalUsers}
          icon={<PeopleIcon color="primary" fontSize="large" />}
        />
        <StatCard
          label="Active Users"
          value={activeUsers}
          icon={<PersonCheckIcon color="success" fontSize="large" />}
        />
        <StatCard
          label="Inactive Users"
          value={inactiveUsers}
          icon={<PersonOffIcon color="error" fontSize="large" />}
        />
        <StatCard
          label="Relationship Managers"
          value={rms}
          icon={<WorkIcon color="secondary" fontSize="large" />}
        />
        <StatCard
          label="Analysts"
          value={analysts}
          icon={<PsychologyIcon color="info" fontSize="large" />}
        />
      </Box>

      {/* Quick Actions */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => navigate("/admin/create-user")}
          >
            Create User
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/admin/users")}
          >
            User Management
          </Button>
        </Stack>
      </Paper>

      {/* Recent Users */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Recent Users
        </Typography>

        {users.slice(0, 5).map((u) => (
          <Box
            key={u.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 1,
              borderBottom: "1px solid #eee",
            }}
          >
            <Typography>{u.username}</Typography>
            <Typography color="text.secondary">
              {u.role}
            </Typography>
          </Box>
        ))}

        <Button
          sx={{ mt: 2 }}
          size="small"
          onClick={() => navigate("/admin/users")}
        >
          View All Users →
        </Button>
      </Paper>
    </DashboardLayout>
  );
};

export default AdminDashboard;
