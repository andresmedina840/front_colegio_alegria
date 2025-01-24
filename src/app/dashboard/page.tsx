"use client";

import React from "react";
import Layout from "../components/Layout";
import { Typography, Box } from "@mui/material";

const Dashboard = () => {
  return (
    <Layout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Bienvenido al Dashboard
        </Typography>
        <Typography>
          Aquí puedes gestionar toda la información relacionada con el sistema.
        </Typography>
      </Box>
    </Layout>
  );
};

export default Dashboard;
