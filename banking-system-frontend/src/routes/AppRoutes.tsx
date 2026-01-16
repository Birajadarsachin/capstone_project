import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import ClientList from "../pages/rm/ClientList";
import CreateClient from "../pages/rm/CreateClient";
import AdminDashboard from "../pages/admin/AdminDashboard";
import PrivateRoute from "../components/PrivateRoute";
import RoleRoute from "../components/RoleRoute";
import CreateCreditRequest from "../pages/rm/CreateCreditRequest";
import CreditRequestList from "../pages/rm/CreditRequestList";
import CreditRequestReview from "../pages/analyst/CreditRequestReview";
import CreateUser from "../pages/admin/CreateUser";
import UserStatus from "../pages/admin/UserStatus";
import UserManagement from "../pages/admin/UserManagement";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* RM */}
      <Route
        path="/rm"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["RELATIONSHIP_MANAGER"]}>
              <ClientList />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/rm/create"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["RELATIONSHIP_MANAGER"]}>
              <CreateClient />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      {/* ADMIN */}
      <Route
  path="/admin"
  element={
    <PrivateRoute>
      <RoleRoute allowedRoles={["ADMIN"]}>
        <AdminDashboard />
      </RoleRoute>
    </PrivateRoute>
  }
/>

<Route
  path="/admin/create-user"
  element={
    <PrivateRoute>
      <RoleRoute allowedRoles={["ADMIN"]}>
        <CreateUser />
      </RoleRoute>
    </PrivateRoute>
  }
/>

      {/* ANALYST */}
      
      <Route
  path="/rm/credit-requests/create"
  element={
    <PrivateRoute>
      <RoleRoute allowedRoles={["RELATIONSHIP_MANAGER"]}>
        <CreateCreditRequest />
      </RoleRoute>
    </PrivateRoute>
  }
/>
<Route
  path="/admin/user-status"
  element={
    <PrivateRoute>
      <RoleRoute allowedRoles={["ADMIN"]}>
        <UserStatus />
      </RoleRoute>
    </PrivateRoute>
  }
/>

<Route
  path="/rm/credit-requests"
  element={
    <PrivateRoute>
      <RoleRoute allowedRoles={["RELATIONSHIP_MANAGER"]}>
        <CreditRequestList />
      </RoleRoute>
    </PrivateRoute>
  }
/>
<Route
  path="/analyst"
  element={
    <PrivateRoute>
      <RoleRoute allowedRoles={["ANALYST"]}>
        <CreditRequestReview />
      </RoleRoute>
    </PrivateRoute>
  }
/>
<Route
  path="/admin/users"
  element={
    <PrivateRoute>
      <RoleRoute allowedRoles={["ADMIN"]}>
        <UserManagement />
      </RoleRoute>
    </PrivateRoute>
  }
/>





      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
