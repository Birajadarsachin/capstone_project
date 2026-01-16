import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";
import { createCreditRequest } from "../../api/creditRequestApi";
import { getMyClients } from "../../api/clientApi";
import type { Client } from "../../types/Client";

const CreateCreditRequest = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState({
    clientId: "",
    requestAmount: "",
    tenureMonths: "",
    purpose: "",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getMyClients().then(setClients);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createCreditRequest({
      ...form,
      requestAmount: Number(form.requestAmount),
      tenureMonths: Number(form.tenureMonths),
    });

    setSuccess(true);
    setForm({
      clientId: "",
      requestAmount: "",
      tenureMonths: "",
      purpose: "",
    });
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700}>
          Create Credit Request
        </Typography>
        <Typography color="text.secondary">
          Submit a credit request for an existing client
        </Typography>
      </Box>

      {/* Form Card */}
      <Paper sx={{ p: 4, maxWidth: 700, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 3,
            }}
          >
            {/* Client */}
            <Box sx={{ gridColumn: "1 / -1" }}>
              <TextField
                select
                label="Client"
                name="clientId"
                value={form.clientId}
                onChange={handleChange}
                fullWidth
                required
              >
                {clients.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.companyName}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Amount */}
            <TextField
              label="Request Amount (₹)"
              name="requestAmount"
              type="number"
              value={form.requestAmount}
              onChange={handleChange}
              fullWidth
              required
            />

            {/* Tenure */}
            <TextField
              label="Tenure (Months)"
              name="tenureMonths"
              type="number"
              value={form.tenureMonths}
              onChange={handleChange}
              fullWidth
              required
            />

            {/* Purpose */}
            <Box sx={{ gridColumn: "1 / -1" }}>
              <TextField
                label="Purpose of Credit"
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={3}
              />
            </Box>

            {/* Submit */}
            <Box sx={{ gridColumn: "1 / -1" }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ px: 6 }}
              >
                Submit Credit Request
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          Credit request submitted successfully
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
};

export default CreateCreditRequest;
