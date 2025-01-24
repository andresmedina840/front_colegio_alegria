"use client";

import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";

// Simulación de roles del usuario actual
const currentUserRole = "ADMIN";

const drawerWidth = 240;

interface MenuItem {
  text: string;
  route: string;
  roles: string[];
}

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigate = (route: string) => {
    router.push(route);
    setDrawerOpen(false);
  };

  // Menú con acceso al Dashboard y otras secciones
  const menuItems: MenuItem[] = [
    { text: "Dashboard", route: "/dashboard", roles: ["ADMIN", "PROFESOR", "PADRE"] },
    { text: "Estudiantes", route: "/estudiantes", roles: ["ADMIN", "PROFESOR", "PADRE"] },
    { text: "Materias", route: "/materias", roles: ["ADMIN", "PROFESOR", "PADRE"] },
    { text: "Profesores", route: "/profesores", roles: ["ADMIN", "PROFESOR", "PADRE"] },
  ];

  // Filtrar opciones del menú según el rol del usuario
  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(currentUserRole)
  );

  const drawerContent = (
    <div>
      <Toolbar>
        <Typography variant="h6">Menú</Typography>
      </Toolbar>
      <Divider />
      <List>
        {filteredMenuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleNavigate(item.route)}>
              <ListItemIcon>
                {item.text === "Dashboard" ? (
                  <DashboardIcon />
                ) : index % 2 === 0 ? (
                  <InboxIcon />
                ) : (
                  <MailIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Sistema Educativo
          </Typography>
          <Box display="flex" alignItems="center">
            <Avatar alt="Usuario" src="/user-avatar.png" sx={{ mr: 2 }} />
            <IconButton color="inherit">
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="persistent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? drawerWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            transition: "width 0.3s ease",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: drawerOpen ? `${drawerWidth}px` : 0,
          transition: "margin-left 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        {children}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#f5f5f5",
          padding: 2,
          textAlign: "center",
          borderTop: "1px solid #ddd",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Mi Aplicación. Todos los derechos
          reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
