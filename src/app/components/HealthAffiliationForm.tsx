import { Card, CardContent, Grid, Typography } from "@mui/material";
import CustomTextField from "./personalizados/CustomTextField";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";
import { FormDataType } from "../types/formTypes";
import { OpcionSelect } from "../types";
import { useFormContext } from "react-hook-form";

interface HealthAffiliationFormProps {
  estratoEconomico: OpcionSelect[];
  updateField: (field: keyof FormDataType, value: string) => void;
}

const HealthAffiliationForm: React.FC<HealthAffiliationFormProps> = ({
  estratoEconomico,
}) => {
  const { control } = useFormContext<FormDataType>();

  const formFields = [
    {
      label: "Tipo de Sangre y RH",
      name: "tipoSangre" as keyof FormDataType,
      maxLength: 5,
    },
    {
      label: "Eps Afiliado",
      name: "epsAfiliado" as keyof FormDataType,
      maxLength: 45,
    },
    {
      label: "IPS Asignada",
      name: "ipsAsignada" as keyof FormDataType,
      maxLength: 55,
    },
    {
      label: "ARS Afiliado",
      name: "arsAfiliado" as keyof FormDataType,
      maxLength: 55,
    },
    {
      label: "Nro Carnet SISBEN",
      name: "nroCarnetSisben" as keyof FormDataType,
      maxLength: 20,
    },
    {
      label: "Nivel de SISBEN",
      name: "nivelSisben" as keyof FormDataType,
      maxLength: 5,
    },
  ];

  return (
    <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography
          variant="h5"
          align="left"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Afiliación al sistema de salud
        </Typography>

        <Grid container spacing={2}>
          {formFields.map((field) => (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={field.name}>
              <CustomTextField<FormDataType>
                label={field.label}
                name={field.name}
                maxLength={field.maxLength}
                uppercase
                showCharCount
              />
            </Grid>
          ))}

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <CustomAutocomplete<FormDataType, OpcionSelect>
              name="estrato"
              label="Estrato económico"
              options={estratoEconomico}
              required
              control={control}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
              getOptionValue={(option: OpcionSelect) => option.id}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HealthAffiliationForm;
