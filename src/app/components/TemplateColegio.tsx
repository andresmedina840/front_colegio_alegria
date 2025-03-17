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
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Book as BookIcon,
  School as SchoolIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { MENU_ITEMS } from "../config/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  
  // TODO: Reemplazar con lógica de autenticación real
  const currentUserRole = "ADMIN";

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const handleNavigate = (route: string) => {
    router.push(route);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }
    router.push("/login");
  };

  // Mapeo de íconos dinámicos
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Dashboard":
        return <DashboardIcon />;
      case "People":
        return <PeopleIcon />;
      case "Assignment":
        return <AssignmentIcon />;
      case "Book":
        return <BookIcon />;
      case "School":
        return <SchoolIcon />;
      default:
        return <DashboardIcon />;
    }
  };

  // Filtrar menú por roles
  const filteredMenuItems = MENU_ITEMS.filter(item => 
    item.roles.includes(currentUserRole)
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
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
            Colegio Alegría del Norte
          </Typography>
          
          <Box display="flex" alignItems="center">
            <Avatar alt="Usuario" src="/user-avatar.png" sx={{ mr: 2 }} />
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6">Menú</Typography>
        </Toolbar>
        <Divider />
        
        <List>
          {filteredMenuItems.map(item => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleNavigate(item.route)}>
                <ListItemIcon>
                  {getIcon(item.icon)}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "margin 0.3s ease",
          marginLeft: { sm: drawerOpen ? `${drawerWidth}px` : 0 },
        }}
      >
        <Toolbar />
        {children}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: "auto",
          py: 2,
          bgcolor: "background.paper",
          borderTop: 1,
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Colegio Alegría del Norte. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;