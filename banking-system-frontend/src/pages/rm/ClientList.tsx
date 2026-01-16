import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  TextField,
  Stack,
} from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getMyClients } from "../../api/clientApi";
import type { Client } from "../../types/Client";

const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMyClients()
      .then((data) => setClients(data))
      .finally(() => setLoading(false));
  }, []);

  const filteredClients = clients.filter(
    (c) =>
      c.companyName.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700}>
          My Clients
        </Typography>
        <Typography color="text.secondary">
          Corporate clients assigned to you
        </Typography>
      </Box>

      {/* Search */}
      <Stack direction="row" mb={3}>
        <TextField
          label="Search by company or industry"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
      </Stack>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Table */}
      {!loading && (
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#F1F5F9" }}>
                <TableCell><b>Company Name</b></TableCell>
                <TableCell><b>Industry</b></TableCell>
                <TableCell><b>Primary Contact</b></TableCell>
                <TableCell align="right"><b>Turnover (₹ Cr)</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredClients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography color="text.secondary">
                      No clients found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              {filteredClients.map((client) => (
                <TableRow key={client.id} hover>
                  <TableCell>{client.companyName}</TableCell>
                  <TableCell>{client.industry}</TableCell>
                  <TableCell>
                    {client.primaryContactName}
                  </TableCell>
                  <TableCell align="right">
                    {client.annualTurnover}
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

export default ClientList;
