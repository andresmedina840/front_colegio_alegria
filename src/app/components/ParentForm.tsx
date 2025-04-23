import { Grid, Typography } from "@mui/material";
import React from "react";
import CustomTextField from "../components/personalizados/CustomTextField";
import CustomAutocomplete from "../components/personalizados/CustomAutocomplete";
import { useFormContext } from "react-hook-form";
import { FormDataType } from "../types/formTypes";

type OpcionSelect = {
  id: string | number;
  nombre: string;
};

type ParentFormProps = {
  title: "Padre" | "Madre";
  tiposIdentificacion: OpcionSelect[];
};

const ParentForm: React.FC<ParentFormProps> = ({
  title,
  tiposIdentificacion,
}) => {
  const field = (key: string) => `${key}${title}` as keyof FormDataType;
  const { control, setValue } = useFormContext<FormDataType>();

  const handleAutocompleteChange =
    (fieldName: keyof FormDataType) =>
    (_: React.SyntheticEvent, value: OpcionSelect | null) => {
      setValue(fieldName, value?.id.toString() || "");
    };

  return (
    <>
      <Typography variant="h5" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 5, md: 5 }}>
          <CustomAutocomplete<FormDataType, OpcionSelect>
            label={`Tipo Identificación ${title}`}
            name={field(`tipoIdentificacion${title}`)}
            options={tiposIdentificacion}
            control={control}
            getOptionLabel={(option: OpcionSelect) => option.nombre}
            onChange={handleAutocompleteChange(
              field(`tipoIdentificacion`)
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3, md: 3 }}>
          <CustomTextField<FormDataType>
            label={`Número Identificación ${title}`}
            name={field(`numeroIdentificacion`)}
            uppercase
            maxLength={12}
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <CustomTextField<FormDataType>
            label={`Primer Nombre ${title}`}
            name={field("primerNombre")}
            uppercase
            maxLength={26}
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <CustomTextField<FormDataType>
            label={`Segundo Nombre ${title}`}
            name={field("segundoNombre")}
            uppercase
            maxLength={26}
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <CustomTextField<FormDataType>
            label={`Primer Apellido ${title}`}
            name={field("primerApellido")}
            uppercase
            maxLength={26}
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <CustomTextField<FormDataType>
            label={`Segundo Apellido ${title}`}
            name={field("segundoApellido")}
            uppercase
            maxLength={26}
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 7, md: 7 }}>
          <CustomTextField<FormDataType>
            label={`Direccion ${title}`}
            name={field("direccion")}
            uppercase
            maxLength={50}
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 5, md: 5 }}>
          <CustomTextField<FormDataType>
            label={`Barrio ${title}`}
            name={field("barrio")}
            uppercase
            maxLength={26}
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <CustomTextField<FormDataType>
            label={`Numero Celular ${title}`}
            name={field("numeroCelular")}
            uppercase
            maxLength={10}
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 8, md: 8 }}>
          <CustomTextField<FormDataType>
            label={`Ocupación ${title}`}
            name={field("ocupacion")}
            uppercase
            maxLength={26}
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <CustomTextField<FormDataType>
            label={`Correo Electronico ${title}`}
            name={field("correoElectronico")}
            uppercase={false}
            maxLength={50}
            showCharCount
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ParentForm;
