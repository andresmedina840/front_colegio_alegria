import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";

type DocumentacionRecibidaProps = {
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  siNo: string[];
};

const DocumentacionRecibida: React.FC<DocumentacionRecibidaProps> = ({
  formData,
  handleChange,
  siNo,
}) => {
  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          align="left"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Documentación Recibida
        </Typography>
        <Grid container spacing={2}>
          {[
            "RegistroCivil",
            "CertificadosEstudios",
            "CertificadoVinculado",
            "SistemaSocial",
            "Fotos",
            "EntidadAseguradora",
            "SeguroEstudiantil",
            "CertificadoEstratoSocioeconomico",
            "PagoSalvo",
            "RegistroVacunacion",
            "ExamenSerologia",
          ].map((doc) => (
            <Grid item xs={12} sm={3} key={doc}>
              <CustomAutocomplete
              name={`documentacionRecibida${doc}`}
                label={doc.replace(/([A-Z])/g, " $1").trim()}
                options={siNo}
                value={formData[`documentacionRecibida${doc}`] || ""}
                onChange={(value) =>
                  handleChange({
                    target: { name: `documentacionRecibida${doc}`, value: value ?? "" },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                getOptionLabel={(option) => option}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DocumentacionRecibida;