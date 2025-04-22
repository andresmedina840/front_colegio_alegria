import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import Discapacidades from "../components/Discapacidades";
import CapacidadesExcepcionales from "./CapacidadesExcepcionales";
import { FormDataType } from "../types/formTypes";

interface CondicionesEspecialesProps {
  formData: FormDataType;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  siNo: string[];
}

const CondicionesEspeciales: React.FC<CondicionesEspecialesProps> = ({
  formData,
  handleChange,
  siNo,
}) => {
  const handleAutocompleteChange = (name: string, value: string) => {
    handleChange({
      target: {
        name,
        value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
          Condiciones Especiales del Estudiante
        </Typography>

        <Discapacidades siNo={siNo} />

        <Divider sx={{ my: 4 }} />

        <CapacidadesExcepcionales
          formData={formData}
          handleAutocompleteChange={handleAutocompleteChange}
          siNo={siNo}
        />
      </CardContent>
    </Card>
  );
};

export default CondicionesEspeciales;
