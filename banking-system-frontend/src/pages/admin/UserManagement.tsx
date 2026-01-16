import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  CircularProgress,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getAllUsers,
  updateUserStatus,
  type User,
} from "../../api/adminApi";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    const data = await getAllUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleStatus = async (user: User) => {
    await updateUserStatus(user.id, !user.active);
    loadUsers();
  };

  const filteredUsers = users.filter(
    (u) =>
      (u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter ? u.role === roleFilter : true)
  );

  return (
    <DashboardLayout>
      <Typography variant="h4" fontWeight={700} mb={2}>
        User Management
      </Typography>

      {/* Filters */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        mb={3}
      >
        <TextField
          label="Search by username or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />

        <TextField
          select
          label="Filter by role"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Roles</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
          <MenuItem value="RELATIONSHIP_MANAGER">
            Relationship Manager
          </MenuItem>
          <MenuItem value="ANALYST">Analyst</MenuItem>
        </TextField>
      </Stack>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#F1F5F9" }}>
                <TableCell><b>Username</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Role</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell align="center"><b>Action</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>

                  <TableCell>
                    <Chip
                      label={user.role}
                      size="small"
                      color={
                        user.role === "ADMIN"
                          ? "primary"
                          : user.role === "ANALYST"
                          ? "secondary"
                          : "default"
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={user.active ? "Active" : "Inactive"}
                      color={user.active ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="center">
                    {user.role !== "ADMIN" && (
                      <Button
                        variant="contained"
                        size="small"
                        color={user.active ? "error" : "success"}
                        onClick={() => toggleStatus(user)}
                      >
                        {user.active ? "Deactivate" : "Activate"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DashboardLayout>
  );
};

export default UserManagement;
