import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormDataType } from "../types/formTypes";
import CustomAutocomplete from "../components/personalizados/CustomAutocomplete";

interface OpcionSiNo {
  id: number;
  nombre: string;
}

interface CapacidadesExcepcionalesProps {
  formData: FormDataType;
  handleAutocompleteChange: (name: string, value: string) => void;
  siNo: string[];
}

const CapacidadesExcepcionales: React.FC<CapacidadesExcepcionalesProps> = ({
  formData,
  siNo,
  handleAutocompleteChange,
}) => {
  const { control } = useFormContext<FormDataType>();

  const opcionesSiNo: OpcionSiNo[] = siNo.map((option, index) => ({
    id: index,
    nombre: option,
  }));

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
          <CustomAutocomplete<FormDataType, OpcionSiNo>
            label={field.label}
            name={field.name as keyof FormDataType}
            options={opcionesSiNo}
            control={control}
            getOptionLabel={(option) => option.nombre}
            onChange={(event, value) => {
              handleAutocompleteChange(field.name, value?.nombre || "");
            }}
            disabled={field.name !== "noAplicaCapacidad" && disableOthers}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CapacidadesExcepcionales;