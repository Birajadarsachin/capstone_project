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
  Chip,
  Box,
} from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getCreditRequests } from "../../api/creditRequestApi";
import { getMyClients } from "../../api/clientApi";
import type { CreditRequest } from "../../types/CreditRequest";
import type { Client } from "../../types/Client";

const getStatusChip = (status: string) => {
  switch (status) {
    case "Approved":
      return <Chip label="Approved" color="success" size="small" />;
    case "Rejected":
      return <Chip label="Rejected" color="error" size="small" />;
    default:
      return <Chip label="Pending" color="warning" size="small" />;
  }
};

const CreditRequestList = () => {
  const [requests, setRequests] = useState<CreditRequest[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCreditRequests(), getMyClients()])
      .then(([reqData, clientData]) => {
        setRequests(reqData);
        setClients(clientData);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔑 Build lookup map: clientId -> companyName
  const clientMap = clients.reduce<Record<string, string>>(
    (map, client) => {
      map[client.id] = client.companyName;
      return map;
    },
    {}
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700}>
          My Credit Requests
        </Typography>
        <Typography color="text.secondary">
          Credit requests submitted by you
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#F1F5F9" }}>
                <TableCell><b>Client Name</b></TableCell>
                <TableCell align="right"><b>Amount (₹)</b></TableCell>
                <TableCell align="right"><b>Tenure (Months)</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Remarks</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {requests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography color="text.secondary">
                      No credit requests found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              {requests.map((req) => (
                <TableRow key={req.id} hover>
                  <TableCell>
                    {clientMap[req.clientId] || "Unknown Client"}
                  </TableCell>
                  <TableCell align="right">
                    {req.requestAmount}
                  </TableCell>
                  <TableCell align="right">
                    {req.tenureMonths}
                  </TableCell>
                  <TableCell>
                    {getStatusChip(req.status)}
                  </TableCell>
                  <TableCell>
                    {req.remarks || "-"}
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

export default CreditRequestList;
