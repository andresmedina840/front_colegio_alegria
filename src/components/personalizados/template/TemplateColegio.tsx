// src/components/personalizados/template/TemplateColegio.tsx
"use client";

import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/authStore";
import { MENU_ITEMS } from "@/app/config/navigation";
import { ICON_COMPONENTS } from "@/app/config/iconMap";
import type { UserRole, IconName } from "@/types";

const drawerWidth = 240;

export default function TemplateColegio({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const role = user?.role;

  // ✅ Verificamos que el rol sea válido
  const isValidRole = role === "ADMIN" || role === "PROFESOR" || role === "PADRE";
  if (!isValidRole) return null;

  const currentRole = role as UserRole;

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const handleNavigate = (route: string) => {
    router.push(route);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/login?sessionExpired=true");
  };

  const filteredMenu = MENU_ITEMS.filter((item) =>
    item.roles.includes(currentRole)
  );

  const drawerContent = (
    <Box sx={{ overflow: "auto" }}>
      <Toolbar />
      <List>
        {filteredMenu.map((item) => {
          const Icon = ICON_COMPONENTS[item.icon as IconName];
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleNavigate(item.route)}>
                <ListItemIcon sx={{ color: "#1976d2", minWidth: 40 }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar superior */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            Colegio Alegría del Norte
          </Typography>

          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user?.username ?? "Usuario"}
            </Typography>
            <Avatar sx={{ bgcolor: "#1976d2", mr: 1 }}>
              {user?.username?.charAt(0).toUpperCase() ?? "U"}
            </Avatar>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer temporal para móviles */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Drawer permanente para escritorio */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
