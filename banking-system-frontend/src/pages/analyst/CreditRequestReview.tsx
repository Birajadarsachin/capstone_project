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
  Button,
  TextField,
  Chip,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getCreditRequests,
  updateCreditRequestStatus,
} from "../../api/creditRequestApi";
import type { CreditRequest } from "../../types/CreditRequest";

const statusChip = (status: string) => {
  switch (status) {
    case "Approved":
      return <Chip label="Approved" color="success" size="small" />;
    case "Rejected":
      return <Chip label="Rejected" color="error" size="small" />;
    default:
      return <Chip label="Pending" color="warning" size="small" />;
  }
};

const CreditRequestReview = () => {
  const [requests, setRequests] = useState<CreditRequest[]>([]);
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const data = await getCreditRequests();
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAction = async (
    id: string,
    status: "Approved" | "Rejected"
  ) => {
    await updateCreditRequestStatus(id, status, remarks[id] || "");
    loadData();
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700}>
          Credit Request Review
        </Typography>
        <Typography color="text.secondary">
          Review and process submitted credit requests
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#F1F5F9" }}>
                <TableCell><b>Client ID</b></TableCell>
                <TableCell align="right"><b>Amount (₹)</b></TableCell>
                <TableCell align="right"><b>Tenure (Months)</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Remarks</b></TableCell>
                <TableCell><b>Action</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {requests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography color="text.secondary">
                      No credit requests available
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              {requests.map((r) => (
                <TableRow key={r.id} hover>
                  <TableCell sx={{ fontFamily: "monospace" }}>
                    {r.clientId}
                  </TableCell>

                  <TableCell align="right">
                    {r.requestAmount}
                  </TableCell>

                  <TableCell align="right">
                    {r.tenureMonths}
                  </TableCell>

                  <TableCell>{statusChip(r.status)}</TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      placeholder="Add remarks"
                      value={remarks[r.id] || ""}
                      onChange={(e) =>
                        setRemarks({
                          ...remarks,
                          [r.id]: e.target.value,
                        })
                      }
                      disabled={r.status !== "Pending"}
                      fullWidth
                    />
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        disabled={r.status !== "Pending"}
                        onClick={() =>
                          handleAction(r.id, "Approved")
                        }
                      >
                        Approve
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        disabled={r.status !== "Pending"}
                        onClick={() =>
                          handleAction(r.id, "Rejected")
                        }
                      >
                        Reject
                      </Button>
                    </Stack>
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

export default CreditRequestReview;
