import React from "react";

interface CapacidadesExcepcionalesProps {
  formData: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  siNo: string[];
}

const CapacidadesExcepcionales: React.FC<CapacidadesExcepcionalesProps> = ({
  formData,
  handleChange,
  siNo,
}) => {
  return (
    <div>
      <label>¿Tiene capacidades excepcionales?</label>
      <select
        name="capacidad_excepcional"
        value={formData["capacidad_excepcional"] || ""}
        onChange={handleChange}
      >
        {siNo.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CapacidadesExcepcionales;
