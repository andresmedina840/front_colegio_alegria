"use client";

import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Control } from "react-hook-form";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";
import { StudentInfoFormValues } from "@/schemas/studentInfoSchema";

type OptionType = {
  id: string;
  nombre: string;
};

// Extraemos solo los nombres de campos de documentación
type DocumentacionFields = Extract<
  keyof StudentInfoFormValues,
  `documentacionRecibida${string}`
>;

const documentFields: {
  field: DocumentacionFields;
  label: string;
}[] = [
  { field: "documentacionRecibidaRegistroCivil", label: "Registro Civil" },
  {
    field: "documentacionRecibidaCertificadosEstudios",
    label: "Certificados de Estudios",
  },
  {
    field: "documentacionRecibidaCertificadoVinculado",
    label: "Certificado Vinculado",
  },
  { field: "documentacionRecibidaSistemaSocial", label: "Sistema Social" },
  { field: "documentacionRecibidaFotos", label: "Fotos" },
  {
    field: "documentacionRecibidaEntidadAseguradora",
    label: "Entidad Aseguradora",
  },
  {
    field: "documentacionRecibidaSeguroEstudiantil",
    label: "Seguro Estudiantil",
  },
  {
    field: "documentacionRecibidaCertificadoEstratoSocioeconomico",
    label: "Certificado Estrato Socioeconómico",
  },
  { field: "documentacionRecibidaPagoSalvo", label: "Pago Salvo" },
  {
    field: "documentacionRecibidaRegistroVacunacion",
    label: "Registro de Vacunación",
  },
  {
    field: "documentacionRecibidaExamenSerologia",
    label: "Examen de Serología",
  },
];

interface DocumentacionRecibidaProps {
  control: Control<StudentInfoFormValues>;
  siNo: OptionType[];
}

const DocumentacionRecibida: React.FC<DocumentacionRecibidaProps> = ({
  control,
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
          {documentFields.map(({ field, label }) => (
            <Grid size={{ xs: 12, sm: 3 }} key={field}>
              <CustomAutocomplete<StudentInfoFormValues, OptionType>
                name={field}
                control={control}
                label={label}
                options={siNo}
                getOptionLabel={(option) => option.nombre}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DocumentacionRecibida;
