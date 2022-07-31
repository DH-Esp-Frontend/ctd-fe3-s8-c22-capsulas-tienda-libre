import React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import RadioGroup from "@mui/material/RadioGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { countries } from "countries-list";
import Radio from "@mui/material/Radio";
import Container from "@mui/material/Container";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useRouter } from "next/router";
// Importamos las depedendencias de React Hook Form
import {
  useForm,
  Controller,
  UseControllerProps,
  useController,
} from "react-hook-form";
// Importamos el resolver para agregar las validaciones
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { defaultLocale, TEXTS_BY_LANGUAGE } from "../locale/constants";

const countriesValues = Object.values(countries);
const countriesNames = countriesValues.map((country) => country.name);

// Creamos un Wrapper para poder reutilizar el componente TextField a lo largo
// del formulario
const TextFieldWrapper = ({
  control,
  name,
  defaultValue,
  rules,
  ...props
}: UseControllerProps<TextFieldProps>) => {
  const { field } = useController({
    control,
    name,
    defaultValue,
    rules,
  });

  return <TextField {...props} {...field} />;
};

const Contacto: NextPage = () => {
  const { locale } = useRouter();

  const { CONTACT } =
    TEXTS_BY_LANGUAGE[locale as keyof typeof TEXTS_BY_LANGUAGE] ??
    TEXTS_BY_LANGUAGE[defaultLocale];

  // Creamos el esquema para realizar nuestras validaciones.
  // Para el caso de validacione inválidas, asignamos un mensaje de error
  // customizado
  const schema = yup
    .object({
      name: yup.string().required(CONTACT.ERRORS.NAME),
      email: yup.string().required(CONTACT.ERRORS.EMAIL),
      country: yup
        .string()
        .oneOf(countriesNames)
        .required(CONTACT.ERRORS.COUNTRY),
      gender: yup
        .string()
        .oneOf(["male", "female", "other"])
        .required(CONTACT.ERRORS.GENDER),
      question: yup.string().min(10).required(CONTACT.ERRORS.QUESTION),
      tycs: yup
        .boolean()
        .test("OK", CONTACT.ERRORS.TYCS, (value) => value === true),
    })
    .required();

  // Utilizamos el hook useForm para acceder a "control", "handleSubmit"
  // e "errors", pasándole el resolver con el esquema que creamos
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Creamos un callback que se ejecutará cuando se envíe el formulario
  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <Container maxWidth="sm">
      <Box sx={{ maxWidth: 500, marginTop: 3 }}>
        <Paper
          elevation={4}
          sx={{ p: "32px", display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: 24 }}>
            {CONTACT.TITLE}
          </Typography>
          {/* Envolvemos nuestros campos en la etiqueta form y pasamos el callback
              al evento onSubmit */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12}>
              <TextFieldWrapper
                name="name"
                id="outlined-basic"
                label={CONTACT.FIELDS.NAME}
                variant="outlined"
                sx={{ width: 1 }}
                control={control}
                // Pasamos estos campos como props para
                // ver el mensaje de error
                error={errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextFieldWrapper
                name="email"
                type="email"
                id="outlined-basic"
                label={CONTACT.FIELDS.EMAIL}
                variant="outlined"
                sx={{ width: 1 }}
                control={control}
                // Pasamos estos campos como props para
                // ver el mensaje de error
                error={errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            {/* Pasamos el error al componente que controla este campo */}
            <FormControl fullWidth error={errors.country}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <>
                    <InputLabel id="demo-simple-select-label">
                      {CONTACT.FIELDS.COUNTRY}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={CONTACT.FIELDS.COUNTRY}
                      {...field}
                    >
                      {countriesNames.map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* Aquí creamos un mensaje de error y lo mostramos si corresponde */}
                    {errors.country && <small>{errors.country.message}</small>}
                  </>
                )}
              />
            </FormControl>

            <FormLabel id="demo-radio-buttons-group-label">
              {CONTACT.FIELDS.GENDER}
            </FormLabel>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  {...field}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label={CONTACT.FIELDS.FEMALE}
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label={CONTACT.FIELDS.MALE}
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label={CONTACT.FIELDS.OTHER}
                  />
                  {/* Aquí creamos un mensaje de error y lo mostramos si corresponde */}
                  {errors.gender && <small>{errors.gender.message}</small>}
                </RadioGroup>
              )}
            />

            <FormGroup>
              <InputLabel id="demo-simple-select-label">
                {CONTACT.FIELDS.QUESTION}
              </InputLabel>
              <Controller
                name="question"
                control={control}
                render={({ field }) => (
                  <>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={10}
                      {...field}
                    />
                    {/* Aquí creamos un mensaje de error y lo mostramos si corresponde */}
                    {errors.question && (
                      <small>{errors.question.message}</small>
                    )}
                  </>
                )}
              />
            </FormGroup>

            <FormGroup>
              <Controller
                name="tycs"
                control={control}
                render={({ field }) => (
                  <>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={CONTACT.FIELDS.TYCS}
                      {...field}
                    />
                    {/* Aquí creamos un mensaje de error y lo mostramos si corresponde */}
                    {errors.tycs && <small>{errors.tycs.message}</small>}
                  </>
                )}
              />
            </FormGroup>
            {/* Agregamos el tipo "submit" al botón para asegurarnos 
                que envíe el formulario */}
            <Button variant="contained" sx={{ width: 1 }} type="submit">
              {CONTACT.SEND_BUTTON}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};
export default Contacto;
