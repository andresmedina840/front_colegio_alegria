"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormContext, useFieldArray } from "react-hook-form";
import { FormDataType, OpcionSelect } from "../types";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";
import CustomTextField from "./personalizados/CustomTextField";

type Props = {
  tiposAcudiente: OpcionSelect[];
};

const AcudientesForm = ({ tiposAcudiente }: Props) => {
  const { control, register } = useFormContext<FormDataType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "acudientes",
  });

  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          align="left"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Acudientes
        </Typography>

        {fields.map((field, index) => (
          <Box key={field.id} mb={4}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, sm: 2, md: 4 }}>
                <CustomAutocomplete<FormDataType, OpcionSelect>
                  label="Tipo de Acudiente"
                  name={`acudientes.${index}.tipoAcudienteId`}
                  options={tiposAcudiente}
                  control={control}
                  getOptionLabel={(opt) => opt.nombre}
                  getOptionValue={(option) => option.id}  
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 2, md: 4 }}>
                <CustomTextField
                  label="Primer Nombre"
                  maxLength={26}
                  showCharCount
                  uppercase
                  {...register(`acudientes.${index}.primerNombre`)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 2, md: 4 }}>
                <CustomTextField
                  label="Segundo Nombre"
                  maxLength={26}
                  showCharCount
                  uppercase
                  {...register(`acudientes.${index}.segundoNombre`)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 2, md: 4 }}>
                <CustomTextField
                  label="Primer Apellido"
                  maxLength={26}
                  showCharCount
                  uppercase
                  {...register(`acudientes.${index}.primerApellido`)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 2, md: 4 }}>
                <CustomTextField
                  label="Segundo Apellido"
                  maxLength={26}
                  showCharCount
                  uppercase
                  {...register(`acudientes.${index}.segundoApellido`)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 2, md: 4 }}>
                <CustomTextField
                  label="Celular"
                  maxLength={10}
                  showCharCount
                  {...register(`acudientes.${index}.telefono`)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <CustomTextField
                  label="Email"
                  maxLength={60}
                  showCharCount
                  {...register(`acudientes.${index}.email`)}
                />
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <IconButton
                  onClick={() => remove(index)}
                  color="error"
                  size="large"
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
            {index < fields.length - 1 && <Divider sx={{ mt: 4 }} />}
          </Box>
        ))}

        <Box mt={3}>
          <Button
            variant="outlined"
            onClick={() =>
              append({
                tipoAcudienteId: "",
                primerNombre: "",
                segundoNombre: "",
                primerApellido: "",
                segundoApellido: "",
                email: "",
                telefono: "",
              })
            }
          >
            Agregar Acudiente
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AcudientesForm;
