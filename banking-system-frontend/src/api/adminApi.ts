import api from "./axios";

export type User = {
  id: string;
  username: string;
  email: string;
  role: "ADMIN" | "RELATIONSHIP_MANAGER" | "ANALYST";
  active: boolean;
};
export type CreateUserRequest = {
  username: string;
  email: string;
  password: string;
  role: "RELATIONSHIP_MANAGER" | "ANALYST";
};

/* ---------- APIS ---------- */

// ✅ Admin creates RM / Analyst
export const createUser = async (data: CreateUserRequest) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const updateUserStatus = async (
  userId: string,
  active: boolean
) => {
  const response = await api.put(
    `/admin/users/${userId}/status?active=${active}`
  );
  return response.data;
};
