"use client";

import React from "react";
import Layout from "../components/Layout";
import { Typography, Box } from "@mui/material";

const Profesor = () => {
  return (
    <Layout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Bienvenido Profesor
        </Typography>
      </Box>
    </Layout>
  );
};

export default Profesor;
