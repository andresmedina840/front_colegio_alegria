import { Card, CardContent, Typography } from "@mui/material";
import Discapacidades from "./Discapacidades";
import CapacidadesExcepcionales from "./CapacidadesExcepcionales";
import SituacionAcademica from "./SituacionAcademica";

type CondicionesEspecialesProps = {
    formData: Record<string, string>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<{ name?: string; value: unknown }>) => void;
    siNo: string[];
  };  

const CondicionesEspeciales: React.FC<CondicionesEspecialesProps> = ({
  formData,
  handleChange,
  siNo,
}) => {
  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
          Condiciones Especiales del Estudiante
        </Typography>

        <Discapacidades formData={formData} handleChange={handleChange} siNo={siNo} />
        <CapacidadesExcepcionales formData={formData} handleChange={handleChange} siNo={siNo} />
        
      </CardContent>
    </Card>
  );
};

export default CondicionesEspeciales;
