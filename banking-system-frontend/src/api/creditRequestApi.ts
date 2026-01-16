import api from "./axios";
import type { CreditRequest } from "../types/CreditRequest";

export const createCreditRequest = async (
  request: Omit<CreditRequest, "id" | "status" | "remarks">
) => {
  const response = await api.post("credit-requests", request);
  return response.data;
};

export const getCreditRequests = async (): Promise<CreditRequest[]> => {
  const response = await api.get("credit-requests");
  return response.data;
};
export const updateCreditRequestStatus = async (
  id: string,
  status: "Approved" | "Rejected",
  remarks: string
) => {
  const response = await api.put(
    `credit-requests/${id}?status=${status}&remarks=${encodeURIComponent(remarks)}`
  );
  return response.data;
};

