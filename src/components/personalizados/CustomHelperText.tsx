// src/components/form/CustomHelperText.tsx
import { Box, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { ReactNode } from "react";

interface CustomHelperTextProps {
  children?: ReactNode;
}

const CustomHelperText = ({ children }: CustomHelperTextProps) => {
  if (!children) return null;

  return (
    <Box 
      component="span" // Cambiamos de div a span
      display="flex" 
      alignItems="center" 
      gap={1} 
      mt={0.5} 
      role="alert"
      sx={{ 
        display: 'inline-flex', // Aseguramos que flex funcione en span
        verticalAlign: 'middle' // Alineación correcta
      }}
    >
      <ErrorIcon color="error" fontSize="small" />
      <Typography 
        component="span" // Cambiamos Typography también a span
        color="error" 
        variant="body2" 
        sx={{ 
          fontSize: 12, 
          lineHeight: 1.5,
          display: 'inline' // Aseguramos comportamiento inline
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default CustomHelperText;