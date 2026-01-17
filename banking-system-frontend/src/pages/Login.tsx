import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️ Login
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const { token, role } = response.data;

      // 2️ Store token so interceptor works
      localStorage.setItem("token", token);

      // 3️ Fetch logged-in user
      const userRes = await api.get("/users/me");

      // 4️ Save to context
      login(token, userRes.data);

      // 5️ Redirect based on role
      if (role === "ROLE_ADMIN") navigate("/admin");
      else if (role === "ROLE_RELATIONSHIP_MANAGER") navigate("/rm");
      else navigate("/analyst");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0F172A, #1E3A8A)",
      px: 2,
    }}
  >
    <Paper
      elevation={10}
      sx={{
        p: 4,
        width: "100%",
        maxWidth: 420,
        borderRadius: 3,
      }}
    >
      {/* 🏦 Main Title */}
      <Typography
        variant="h5"
        fontWeight={700}
        textAlign="center"
        mb={1}
      >
        Corporate Banking Client
      </Typography>

      <Typography
        variant="h6"
        fontWeight={600}
        textAlign="center"
        color="primary"
        mb={2}
      >
        & Credit Management System
      </Typography>

      <Typography
        variant="body2"
        textAlign="center"
        color="text.secondary"
        mb={4}
      >
        Secure access for Admins, Relationship Managers, and Analysts use admin/admin123 to login212
      </Typography>


      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

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
          sx={{
            mt: 4,
            py: 1.2,
            fontWeight: 600,
            borderRadius: 2,
          }}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </Button>
      </form>
    </Paper>
  </Box>


  );
};

export default Login;
