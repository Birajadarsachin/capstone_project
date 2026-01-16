export type User = {
  id: string;
  username: string;
  email: string;
  role: "ADMIN" | "RELATIONSHIP_MANAGER" | "ANALYST";
  active: boolean;
};
