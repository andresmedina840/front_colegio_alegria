import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";

type SituacionAcademicaProps = {
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  siNo: string[];
};

const SituacionAcademica: React.FC<SituacionAcademicaProps> = ({
  formData,
  handleChange,
  siNo,
}) => {
  // Determinar si debemos deshabilitar los demás campos
  const disableOtrosCampos = formData.capacidadesExceptionalesNoAplica === "NO";
  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          align="left"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Situación académica
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              label="No estudio en la vigencia anterior"
              name="situacionAcademicaNoEstudioVigenciaAnterior"
              options={siNo}
              value={formData.situacionAcademicaNoEstudioVigenciaAnterior || ""}
              onChange={(value) =>
                handleChange({
                  target: { name: "situacionAcademicaNoEstudioVigenciaAnterior", value: value ?? "" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              getOptionLabel={(option) => option}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <CustomAutocomplete
              label="Aprobó"
              name="situacionAcademicaAprobo"
              options={siNo}
              value={formData.situacionAcademicaAprobo || ""}
              onChange={(value) =>
                handleChange({
                  target: { name: "situacionAcademicaAprobo", value: value ?? "" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              getOptionLabel={(option) => option}
              disabled={disableOtrosCampos}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <CustomAutocomplete
              label="Reprobó"
              name="situcionAcademicaReprobo"
              options={siNo}
              value={formData.situcionAcademicaReprobo || ""}
              onChange={(value) =>
                handleChange({
                  target: { name: "situcionAcademicaReprobo", value: value ?? "" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              getOptionLabel={(option) => option}
              disabled={disableOtrosCampos}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              label="Pendiente de logros"
              name="situacionAcademicaPendienteLogros"
              options={siNo}
              value={formData.situacionAcademicaPendienteLogros || ""}
              onChange={(value) =>
                handleChange({
                  target: { name: "situacionAcademicaPendienteLogros", value: value ?? "" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              getOptionLabel={(option) => option}
              disabled={disableOtrosCampos}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              label="Viene de otra I.E."
              name="situacionAcademicaVieneOtraIE"
              options={siNo}
              value={formData.situacionAcademicaVieneOtraIE || ""}
              onChange={(value) =>
                handleChange({
                  target: { name: "situacionAcademicaVieneOtraIE", value: value ?? "" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              getOptionLabel={(option) => option}
              disabled={disableOtrosCampos}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              label="Ingresa por primera vez a la I.E."
              name="situcionAcademicaIngresaPrimeraVezIE"
              options={siNo}
              value={formData.situcionAcademicaIngresaPrimeraVezIE || ""}
              onChange={(value) =>
                handleChange({
                  target: { name: "situcionAcademicaIngresaPrimeraVezIE", value: value ?? "" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              getOptionLabel={(option) => option}
              disabled={disableOtrosCampos}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              label="No culminó estudios"
              name="situcionAcademicaNoCulminoEstudios"
              options={siNo}
              value={formData.situcionAcademicaNoCulminoEstudios || ""}
              onChange={(value) =>
                handleChange({
                  target: { name: "situcionAcademicaNoCulminoEstudios", value: value ?? "" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              getOptionLabel={(option) => option}
              disabled={disableOtrosCampos}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SituacionAcademica;