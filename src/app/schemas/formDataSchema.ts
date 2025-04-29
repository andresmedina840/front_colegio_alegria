//src/app/schemas/formDataSchema.ts

import * as yup from 'yup';

export const schema = yup.object().shape({
  estudiante: yup.object().shape({
    id: yup.number().required(),
    nombre: yup.string().required(),
    gradoId: yup.number().required(),
    grado: yup.string().required(),
    directorGrupo: yup.string().required(),
    periodo: yup.string().required(),
    fechaReporte: yup.string().required()
  }),
  materias: yup.array().of(
    yup.object().shape({
      nombre: yup.string().required(),
      estandar: yup.string().nullable(),
      desempeno: yup.string().nullable(),
      recomendaciones: yup.string().nullable(),
      intensidadHoraria: yup.number().required(),
      fallas: yup.number().required(),
      valoracion: yup.number().required(),
      nivel: yup.string().nullable()
    })
  ).required(),
  // Ya no se permite null aquí, para que coincida con FormValues
  observaciones: yup.string().required(),
  totalHoras: yup.number().required(),
  totalFallas: yup.number().required(),
  promedioFinal: yup.number().required()
});
