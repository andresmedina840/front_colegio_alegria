// src/components/ui/Sidebar.tsx
"use client";

import React from "react";
import { useAuthStore } from "@/store/authStore";
import { MENU_ITEMS } from "@/app/config/navigation";
import { ICON_COMPONENTS } from "@/app/config/iconMap";
import type { IconName, UserRole } from "@/types";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";

const drawerWidth = 240;

export default function Sidebar() {
  const role = useAuthStore((state) => state.user?.role) as UserRole | undefined;

  if (!role || !["ADMIN", "PROFESOR", "PADRE"].includes(role)) return null;

  const itemsFiltrados = MENU_ITEMS.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#f9fafb",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
          Colegio Alegría
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List>
          {itemsFiltrados.map((item) => {
            const Icon = ICON_COMPONENTS[item.icon as IconName];

            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} href={item.route}>
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
    </Drawer>
  );
}
