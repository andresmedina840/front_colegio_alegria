// src/app/schemas/emergencyContactSchema.ts
import * as yup from "yup";

export const emergencyContactSchema = yup.object({
  primerNombreEmergencia: yup.string(),
  segundoNombreEmergencia: yup.string(),
  primerApellidoEmergencia: yup.string(),
  segundoApellidoEmergencia: yup.string(),
  telefonoEmergencia: yup
    .string()
    .matches(/^[0-9]{7,10}$/, "Debe tener entre 7 y 10 dígitos")
    .required("Este campo es obligatorio"),
  parentescoEmergencia: yup.string().required("Este campo es obligatorio"),
});

