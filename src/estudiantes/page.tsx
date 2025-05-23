"use client";

import React from "react";
import { Box, Container } from "@mui/material";
import CreateStudentForm from "../components/CreateStudentForm";
import TemplateColegio from "../components/personalizados/template/TemplateColegio";


const Estudiante = () => {
  return (
    <TemplateColegio>
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <CreateStudentForm />
        </Box>
      </Container>
    </TemplateColegio>
  );
};

export default Estudiante;
