"use client";

import React from "react";
import FusionTemplateColegio from "../components/TemplateColegio";
import { Box, Container } from "@mui/material";
import CreateStudentForm from "../components/CreateStudentForm";

const Estudiante = () => {
  return (
    <FusionTemplateColegio>
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <CreateStudentForm />
        </Box>
      </Container>
    </FusionTemplateColegio>
  );
};

export default Estudiante;
