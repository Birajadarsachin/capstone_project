import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";
import { createClient } from "../../api/clientApi";

const CreateClient = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: "",
    industry: "",
    address: "",
    primaryContactName: "",
    primaryContactEmail: "",
    primaryContactPhone: "",
    annualTurnover: 0,
    documentsSubmitted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      companyName: form.companyName,
      industry: form.industry,
      address: form.address,

      // Backend-required flat fields
      primaryContactName: form.primaryContactName,
      primaryContactEmail: form.primaryContactEmail,
      primaryContactPhone: form.primaryContactPhone,

      // Safe extra object (ignored by backend)
      primaryContact: {
        name: form.primaryContactName,
        email: form.primaryContactEmail,
        phone: form.primaryContactPhone,
      },

      annualTurnover: Number(form.annualTurnover),
      documentsSubmitted: form.documentsSubmitted,
    };

    await createClient(payload);
    navigate("/rm");
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700}>
          Create Corporate Client
        </Typography>
        <Typography color="text.secondary">
          Onboard a new corporate banking client
        </Typography>
      </Box>

      {/* Form Card */}
      <Paper sx={{ p: 4, maxWidth: 800, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          {/* Grid Layout */}
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
            {/* Company Info */}
            <TextField
              label="Company Name"
              name="companyName"
              fullWidth
              required
              onChange={handleChange}
            />

            <TextField
              label="Industry"
              name="industry"
              fullWidth
              required
              onChange={handleChange}
            />

            <Box sx={{ gridColumn: "1 / -1" }}>
              <TextField
                label="Address"
                name="address"
                fullWidth
                onChange={handleChange}
              />
            </Box>

            {/* Contact Info */}
            <TextField
              label="Primary Contact Name"
              name="primaryContactName"
              fullWidth
              required
              onChange={handleChange}
            />

            <TextField
              label="Primary Contact Email"
              name="primaryContactEmail"
              type="email"
              fullWidth
              required
              onChange={handleChange}
            />

            <TextField
              label="Primary Contact Phone"
              name="primaryContactPhone"
              fullWidth
              onChange={handleChange}
            />

            {/* Financial Info */}
            <TextField
              label="Annual Turnover (₹ Cr)"
              name="annualTurnover"
              type="number"
              fullWidth
              required
              onChange={handleChange}
            />

            {/* Documents */}
            <Box sx={{ gridColumn: "1 / -1" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="documentsSubmitted"
                    onChange={handleChange}
                  />
                }
                label="Required documents have been submitted"
              />
            </Box>

            {/* Actions */}
            <Box sx={{ gridColumn: "1 / -1" }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ px: 6 }}
              >
                Create Client
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </DashboardLayout>
  );
};

export default CreateClient;
