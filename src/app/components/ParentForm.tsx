import { Grid, Typography, Divider, Box } from "@mui/material";
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
  showOnlyEssentialFields?: boolean;
};

const ParentForm: React.FC<ParentFormProps> = ({
  title,
  tiposIdentificacion,
  showOnlyEssentialFields = false,
}) => {
  const field = (key: string) => `${key}${title}` as keyof FormDataType;
  const { control, setValue } = useFormContext<FormDataType>();

  const handleAutocompleteChange =
    (fieldName: keyof FormDataType) =>
    (_: React.SyntheticEvent, value: OpcionSelect | null) => {
      setValue(fieldName, value?.id.toString() || "");
    };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
        Información del {title}
      </Typography>

      <Grid container spacing={2}>
        {/* Sección de Identificación */}
        <Grid size={{ xs: 12, sm: 5, md: 5 }}>
          <CustomAutocomplete<FormDataType, OpcionSelect>
            label={`Tipo Identificación ${title} *`}
            name={field("tipoIdentificacion")}
            options={tiposIdentificacion}
            control={control}
            onChange={handleAutocompleteChange(field("tipoIdentificacion"))}
            getOptionLabel={(option: OpcionSelect) => option.nombre}
            getOptionValue={(option) => option.id.toString()}
            rules={{ required: "Este campo es obligatorio" }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3, md: 3 }}>
          <CustomTextField<FormDataType>
            label={`Número Identificación ${title} *`}
            name={field("numeroIdentificacion")}
            uppercase
            maxLength={12}
            showCharCount
            rules={{
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[0-9]+$/,
                message: "Solo se permiten números",
              },
            }}
          />
        </Grid>

        {/* Sección de Nombres */}
        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <CustomTextField<FormDataType>
            label={`Primer Nombre ${title} *`}
            name={field("primerNombre")}
            uppercase
            maxLength={26}
            showCharCount
            rules={{
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                message: "Solo se permiten letras",
              },
            }}
          />
        </Grid>

        {!showOnlyEssentialFields && (
          <>
            <Grid size={{ xs: 12, sm: 4, md: 4 }}>
              <CustomTextField<FormDataType>
                label={`Segundo Nombre ${title}`}
                name={field("segundoNombre")}
                uppercase
                maxLength={26}
                showCharCount
                rules={{
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/,
                    message: "Solo se permiten letras",
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4, md: 4 }}>
              <CustomTextField<FormDataType>
                label={`Primer Apellido ${title} *`}
                name={field("primerApellido")}
                uppercase
                maxLength={26}
                showCharCount
                rules={{
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                    message: "Solo se permiten letras",
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4, md: 4 }}>
              <CustomTextField<FormDataType>
                label={`Segundo Apellido ${title}`}
                name={field("segundoApellido")}
                uppercase
                maxLength={26}
                showCharCount
                rules={{
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/,
                    message: "Solo se permiten letras",
                  },
                }}
              />
            </Grid>

            {/* Sección de Contacto y Dirección */}
            <Divider sx={{ my: 2, width: "100%" }} />

            <Grid size={{ xs: 12, sm: 7, md: 7 }}>
              <CustomTextField<FormDataType>
                label={`Dirección ${title}`}
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
                label={`Número Celular ${title} *`}
                name={field("numeroCelular")}
                maxLength={10}
                showCharCount
                rules={{
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Solo se permiten números",
                  },
                  minLength: {
                    value: 10,
                    message: "Debe tener 10 dígitos",
                  },
                }}
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
                label={`Correo Electrónico ${title}`}
                name={field("correoElectronico")}
                uppercase={false}
                maxLength={50}
                showCharCount
                rules={{
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo electrónico inválido",
                  },
                }}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ParentForm;
