"use client";

import React from "react";
import Layout from "../components/Layout";
import { Typography, Box, Container } from "@mui/material";
import CreateStudentForm from "../components/CreateStudentForm";

const Estudiante = () => {
  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <CreateStudentForm />
        </Box>
      </Container>
    </Layout>
  );
};

export default Estudiante;
