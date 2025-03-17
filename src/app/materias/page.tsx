"use client";

import React from "react";
import FusionTemplateColegio from "../components/TemplateColegio";
import { Typography, Box } from "@mui/material";

const Materia = () => {
  return (
    <FusionTemplateColegio>
      <Box>
        <Typography variant="h4" gutterBottom>
          Bienvenido Materia
        </Typography>
      </Box>
    </FusionTemplateColegio>
  );
};

export default Materia;
