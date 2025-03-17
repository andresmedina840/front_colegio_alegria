"use client";

import React from "react";
import FusionTemplateColegio from "../components/TemplateColegio";
import { Typography, Box } from "@mui/material";

const Profesor = () => {
  return (
    <FusionTemplateColegio>
      <Box>
        <Typography variant="h4" gutterBottom>
          Bienvenido Profesor
        </Typography>
      </Box>
    </FusionTemplateColegio>
  );
};

export default Profesor;
