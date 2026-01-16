import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getCreditRequests,
  updateCreditRequestStatus,
} from "../../api/creditRequestApi";
import type { CreditRequest } from "../../types/CreditRequest";

const AnalystDashboard = () => {
  const [requests, setRequests] = useState<CreditRequest[]>([]);
  const [remarks, setRemarks] = useState<Record<string, string>>({});

  const loadRequests = async () => {
    const data = await getCreditRequests();
    setRequests(data);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAction = async (
    id: string,
    status: "Approved" | "Rejected"
  ) => {
    await updateCreditRequestStatus(id, status, remarks[id] || "");
    loadRequests();
  };

  return (
    <DashboardLayout>
      <h2>Analyst – Credit Requests</h2>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Client</th>
            <th>Amount</th>
            <th>Tenure</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.clientId}</td>
              <td>{r.requestAmount}</td>
              <td>{r.tenureMonths}</td>
              <td>{r.status}</td>
              <td>
                <input
                  placeholder="Remarks"
                  value={remarks[r.id] || ""}
                  onChange={(e) =>
                    setRemarks({ ...remarks, [r.id]: e.target.value })
                  }
                />
              </td>
              <td>
                <button onClick={() => handleAction(r.id, "Approved")}>
                  Approve
                </button>
                <button onClick={() => handleAction(r.id, "Rejected")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default AnalystDashboard;
