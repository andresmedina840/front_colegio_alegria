import { Grid } from "@mui/material";
import { FormDataType } from "../types/formTypes";
import CustomAutocomplete from "../components/personalizados/CustomAutocomplete";

interface DiscapacidadesProps {
  formData: FormDataType;
  handleAutocompleteChange: (name: string, value: string) => void;
  siNo: string[];
}

const Discapacidades: React.FC<DiscapacidadesProps> = ({
  formData,
  handleAutocompleteChange,
  siNo,
}) => {
  const discapacidadFields = [
    { name: "noAplica", label: "No aplica" },
    { name: "sorderaProfunda", label: "Sordera profunda" },
    { name: "hipoacusiaBajaVision", label: "Hipoacusia o baja visión" },
    { name: "bajaVisionDiagnosticada", label: "Baja visión diagnosticada" },
    { name: "paralisisCerebral", label: "Parálisis cerebral" },
    { name: "autismo", label: "Autismo" },
    { name: "deficienciaCognitiva", label: "Deficiencia cognitiva" },
    { name: "sindromeDown", label: "Síndrome de Down" },
    { name: "multiple", label: "Múltiple" },
  ];

  const disableOthers = formData.noAplica === "NO";

  return (
    <Grid container spacing={2}>
      {discapacidadFields.map((field) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
          <CustomAutocomplete
            label={field.label}
            name={field.name}
            options={siNo.map((option, index) => ({
              id: index,
              nombre: option,
            }))}
            value={
              siNo
                .map((option, index) => ({ id: index, nombre: option }))
                .find(
                  (opt) =>
                    opt.nombre === formData[field.name as keyof FormDataType]
                ) || null
            }
            onChange={(_, value) =>
              handleAutocompleteChange(field.name, value?.nombre || "")
            }
            getOptionLabel={(option) => option.nombre}
            disabled={field.name !== "noAplica" && disableOthers}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Discapacidades;
