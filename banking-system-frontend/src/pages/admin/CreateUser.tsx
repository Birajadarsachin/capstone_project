import { useState } from "react";
import {
  
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Alert,
} from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";
import { createUser } from "../../api/adminApi";

const CreateUser = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "RELATIONSHIP_MANAGER" as
      | "RELATIONSHIP_MANAGER"
      | "ANALYST",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await createUser(form);
      setSuccess(
        `User "${form.username}" created as ${form.role}`
      );
      setForm({
        username: "",
        email: "",
        password: "",
        role: "RELATIONSHIP_MANAGER",
      });
    } catch (err) {
      setError("Failed to create user");
    }
  };

  return (
    <DashboardLayout>
      <Paper sx={{ maxWidth: 500, p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create RM / Analyst
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            select
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="RELATIONSHIP_MANAGER">
              Relationship Manager
            </MenuItem>
            <MenuItem value="ANALYST">Analyst</MenuItem>
          </TextField>

          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {success}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            Create User
          </Button>
        </form>
      </Paper>
    </DashboardLayout>
  );
};

export default CreateUser;
