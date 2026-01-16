import type { ReactNode } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  PersonAdd,
  People,
  Business,
  RequestQuote,
  Assessment,
  Logout,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const drawerWidth = 240;

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = () => {
    if (!user) return [];

    if (user.role === "ADMIN") {
      return [
        {
          label: "Dashboard",
          path: "/admin",
          icon: <DashboardIcon />,
        },
        {
          label: "Create User",
          path: "/admin/create-user",
          icon: <PersonAdd />,
        },
        {
          label: "User Management",
          path: "/admin/users",
          icon: <People />,
        },
      ];
    }

    if (user.role === "RELATIONSHIP_MANAGER") {
      return [
        {
          label: "Clients",
          path: "/rm",
          icon: <Business />,
        },
        {
          label: "Create Client",
          path: "/rm/create",
          icon: <Business />,
        },
        {
          label: "Create Credit Request",
          path: "/rm/credit-requests/create",
          icon: <RequestQuote />,
        },
        {
          label: "My Credit Requests",
          path: "/rm/credit-requests",
          icon: <Assessment />,
        },
      ];
    }

    if (user.role === "ANALYST") {
      return [
        {
          label: "Credit Requests",
          path: "/analyst",
          icon: <Assessment />,
        },
      ];
    }

    return [];
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top Bar */}
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Corporate Banking System
          </Typography>

          {user && (
            <IconButton
              color="inherit"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <Logout />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      {user && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              marginTop: "64px",
            },
          }}
        >
          <Box sx={{ px: 2, py: 2 }}>
            <Typography
              variant="overline"
              color="text.secondary"
            >
              Navigation
            </Typography>
          </Box>

          <Divider />

          <List>
            {menuItems().map((item) => {
              const isActive =
                location.pathname === item.path;

              return (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    selected={isActive}
                    onClick={() => navigate(item.path)}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 2,
                      "&.Mui-selected": {
                        backgroundColor:
                          "rgba(25, 118, 210, 0.12)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive
                          ? "primary.main"
                          : "inherit",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "64px",
          marginLeft: user ? `${drawerWidth}px` : 0,
          backgroundColor: "#F8FAFC",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
