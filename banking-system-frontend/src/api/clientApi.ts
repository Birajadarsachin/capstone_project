import api from "./axios";
import type { Client } from "../types/Client";

export const getMyClients = async (): Promise<Client[]> => {
  const response = await api.get("rm/clients"); // ✅ FIX
  return response.data;
};

export const createClient = async (client: any) => {
  const response = await api.post("rm/clients", client);
  return response.data;
};
