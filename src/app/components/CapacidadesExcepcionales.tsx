import { Grid } from "@mui/material";
import { FormDataType } from "../types/formTypes";
import CustomAutocomplete from "../components/personalizados/CustomAutocomplete";

interface CapacidadesExcepcionalesProps {
  formData: FormDataType;
  handleAutocompleteChange: (name: string, value: string) => void;
  siNo: string[];
}

const CapacidadesExcepcionales: React.FC<CapacidadesExcepcionalesProps> = ({
  formData,
  handleAutocompleteChange,
  siNo,
}) => {
  const capacidadFields = [
    { name: "noAplicaCapacidad", label: "No aplica" },
    { name: "superdotado", label: "Superdotado" },
    { name: "talentoCientifico", label: "Con talento científico" },
    { name: "talentoTecnologico", label: "Con talento tecnológico" },
    { name: "talentoSubjetivo", label: "Con talento subjetivo" },
  ];

  const disableOthers = formData.noAplicaCapacidad === "SI";

  return (
    <Grid container spacing={2}>
      {capacidadFields.map((field) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
          <CustomAutocomplete
            label={field.label}
            name={field.name}
            options={siNo.map((option, index) => ({ id: index, nombre: option }))}
            value={
              siNo
                .map((option, index) => ({ id: index, nombre: option }))
                .find((opt) => opt.nombre === formData[field.name as keyof FormDataType]) || null
            }
            onChangeSimple={(value) =>
              handleAutocompleteChange(field.name, value?.nombre || "")
            }
            getOptionLabel={(option) => option.nombre}
            disabled={field.name !== "noAplicaCapacidad" && disableOthers}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CapacidadesExcepcionales;
