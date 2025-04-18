"use client";

import { useState, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useSnackbar } from "notistack";
import api from "../axios/axiosClient";
import { useFormState } from "../hooks/useFormState";
import { OpcionSelect } from "../types";
import EnrollmentInfoForm from "./EnrollmentInfoForm";
import StudentInfoForm from "./StudentInfoForm";
import HealthAffiliationForm from "./HealthAffiliationForm";
import CondicionesEspeciales from "./CondicionesEspeciales";
import SituacionAcademica from "./SituacionAcademica";
import DocumentacionRecibida from "./DocumentacionRecibida";
import ParentForm from "./ParentForm";
import EmergencyContactForm from "./EmergencyContactForm";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";
import { FormDataType, FormField } from "../types/formTypes";
import initialFormData from "../estudiantes/initialFormData";
import { useCatalogosEstudiantes } from "../hooks/apisEstudiantes";
import Image from "next/image";

const siNo: OpcionSelect[] = [
  { id: "SI", nombre: "SI" },
  { id: "NO", nombre: "NO" },
];

const CreateStudentForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { formData, updateField, updateFields } = useFormState();

  const {
    grados,
    generos,
    paises,
    tiposIdentificacion,
    estratosEconomico,
    loading,
  } = useCatalogosEstudiantes();

  const [departamentos, setDepartamentos] = useState<OpcionSelect[]>([]);
  const [ciudades, setCiudades] = useState<OpcionSelect[]>([]);
  const jornadaEscolar = ["Mañana", "Tarde", "Completa"];

  const cargarDepartamentos = useCallback(
    async (paisId: string) => {
      if (!paisId) {
        setDepartamentos([]);
        setCiudades([]);
        updateFields({
          paisNacimiento: "",
          departamentoNacimiento: "",
          municipioNacimiento: "",
        });
        return;
      }

      updateField("paisNacimiento", paisId);
      updateField("departamentoNacimiento", "");
      updateField("municipioNacimiento", "");

      try {
        const response = await api.get(`/ubicacion/departamentos/${paisId}`);
        setDepartamentos(response.data);
        setCiudades([]);
      } catch (error) {
        console.error("Error al cargar departamentos:", error);
      }
    },
    [updateField, updateFields]
  );

  const cargarCiudades = useCallback(
    async (departamentoId: string) => {
      updateField("departamentoNacimiento", departamentoId);
      updateField("municipioNacimiento", "");

      try {
        const response = await api.get(`/ubicacion/ciudades/${departamentoId}`);
        setCiudades(response.data);
      } catch (error) {
        console.error("Error al cargar ciudades:", error);
      }
    },
    [updateField]
  );

  const handleAutocompleteChange = useCallback(
    (fieldName: FormField) =>
      (_: React.SyntheticEvent, value: OpcionSelect | null) => {
        updateField(fieldName, value ? value.id : "");
      },
    [updateField]
  );

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | {
          target: {
            name: string;
            value: string | number | boolean | null | undefined;
          };
        }
  ) => {
    const { name, value } = e.target;
    updateField(name as keyof FormDataType, String(value));
  };

  const handleSubmit = useCallback(async () => {
    try {
      await api.post("/alumnos", formData);
      enqueueSnackbar("Estudiante registrado con éxito", {
        variant: "success",
      });
      updateFields(initialFormData);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Error desconocido";
      enqueueSnackbar(msg, { variant: "error" });
    }
  }, [formData, enqueueSnackbar, updateFields]);

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Image
          src="/logo-colegio.png"
          alt="Logo del Colegio"
          width={100}
          height={100}
          priority
          style={{ marginBottom: 20 }}
        />

        <Typography variant="h6" fontWeight="bold" color="text.secondary">
          Cargando datos del formulario de Estudiantes...
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <CircularProgress size={30} color="primary" />
          <Typography variant="body2" color="text.secondary">
            Por favor espera
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "100%",
        margin: "auto",
        mt: 4,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Registro de Estudiante
      </Typography>

      <EnrollmentInfoForm formData={formData} updateField={updateField} />

      <StudentInfoForm
        formData={formData}
        updateField={updateField}
        generos={generos}
        departamentos={departamentos}
        ciudades={ciudades}
        cargarDepartamentos={cargarDepartamentos}
        cargarCiudades={cargarCiudades}
        grados={grados}
        jornadaEscolar={jornadaEscolar}
        paises={paises}
        tiposIdentificacion={tiposIdentificacion}
      />

      <HealthAffiliationForm
        formData={formData}
        updateField={updateField}
        estratoEconomico={estratosEconomico}
      />

      <CondicionesEspeciales
        formData={formData}
        handleChange={(e) =>
          updateField(
            e.target.name as keyof FormDataType,
            String(e.target.value)
          )
        }
        siNo={siNo.map((opt) => opt.nombre)}
      />

      <SituacionAcademica
        formData={formData}
        handleChange={(e) =>
          updateField(
            e.target.name as keyof FormDataType,
            String(e.target.value)
          )
        }
        siNo={siNo}
      />

      <DocumentacionRecibida
        formData={formData}
        handleChange={(e) =>
          updateField(
            e.target.name as keyof FormDataType,
            String(e.target.value)
          )
        }
        siNo={siNo}
      />

      <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            align="left"
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Información Familiar
          </Typography>

          <ParentForm
            title="Padre"
            formData={formData}
            updateField={updateField}
            tiposIdentificacion={tiposIdentificacion}
          />

          <Box sx={{ mt: 2 }}>
            <ParentForm
              title="Madre"
              formData={formData}
              updateField={updateField}
              tiposIdentificacion={tiposIdentificacion}
            />
          </Box>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <CustomAutocomplete
                label="Autorización para contacto de emergencia"
                name="autorizacionContactoEmergencia"
                options={siNo}
                value={
                  siNo.find(
                    (opt) => opt.id === formData.autorizacionContactoEmergencia
                  ) || null
                }
                onChange={handleAutocompleteChange(
                  "autorizacionContactoEmergencia"
                )}
                getOptionLabel={(option) => option.nombre}
              />
            </Grid>

            {formData.autorizacionContactoEmergencia === "SI" && (
              <Box sx={{ mt: 2, ml: 2 }}>
                <EmergencyContactForm
                  formData={formData}
                  handleChange={handleChange}
                />
              </Box>
            )}

            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <CustomAutocomplete
                label="Autorizo para uso de imagen (Fotografía/videos)"
                name="autorizacionImagen"
                options={siNo}
                value={
                  siNo.find((opt) => opt.id === formData.autorizacionImagen) ||
                  null
                }
                onChange={handleAutocompleteChange("autorizacionImagen")}
                getOptionLabel={(option) => option.nombre}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <CustomAutocomplete
                label="Declaración de veracidad de la información"
                name="veracidadInformacion"
                options={siNo}
                value={
                  siNo.find(
                    (opt) => opt.id === formData.veracidadInformacion
                  ) || null
                }
                onChange={handleAutocompleteChange("veracidadInformacion")}
                getOptionLabel={(option) => option.nombre}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <Typography
                variant="h5"
                align="justify"
                sx={{ fontWeight: "bold", mb: 3 }}
              >
                Con mi firma y con la de mi padre, madre o acudiente, nos
                comprometemos a cumplir con lo establecido en el Manual de
                Convivencia del Colegio Alegria del Norte.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        Registrar Estudiante
      </Button>
    </Box>
  );
};

export default CreateStudentForm;
