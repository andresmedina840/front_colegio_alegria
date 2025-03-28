import React from "react";

interface DiscapacidadesProps {
  formData: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  siNo: string[];
}

const Discapacidades: React.FC<DiscapacidadesProps> = ({ formData, handleChange, siNo }) => {
  return (
    <div>
      <label>¿Tiene alguna discapacidad?</label>
      <select name="discapacidad" value={formData["discapacidad"] || ""} onChange={handleChange}>
        {siNo.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Discapacidades;
