// src/app/hooks/useFormState.ts
import { useState, useCallback } from "react";
import { FormDataType } from "../types/formTypes";
import initialFormData from "../estudiantes/initialFormData";

export const useFormState = () => {
  const [formData, setFormData] = useState<FormDataType>(initialFormData);

  const updateField = useCallback((field: keyof FormDataType, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const updateFields = useCallback((fields: Partial<FormDataType>) => {
    setFormData(prev => ({
      ...prev,
      ...fields
    }));
  }, []);

  return {
    formData,
    updateField,
    updateFields,
    setFormData
  };
};