import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import type { ReactNode } from "react";
import type { User } from "../types/User";

type Props = {
  allowedRoles: User["role"][];
  children: ReactNode;
};

const RoleRoute = ({ allowedRoles, children }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    if (user.role === "ADMIN") return <Navigate to="/admin" replace />;
    if (user.role === "RELATIONSHIP_MANAGER") return <Navigate to="/rm" replace />;
    return <Navigate to="/analyst" replace />;
  }

  return <>{children}</>;
};

export default RoleRoute;
