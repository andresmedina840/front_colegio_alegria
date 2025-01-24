"use client";

import React from "react";
import Layout from "../components/Layout";
import { Typography, Box } from "@mui/material";

const Estudiante = () => {
  return (
    <Layout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Bienvenido Estudiantes
        </Typography>
      </Box>
    </Layout>
  );
};

export default Estudiante;
