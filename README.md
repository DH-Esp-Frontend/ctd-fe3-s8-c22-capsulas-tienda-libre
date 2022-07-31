# Especialización en Frontend III - Semana 8 - Clase 22

## Capsula Modulo 4 - Material UI

Para esta ejercitación, continuaremos trabajando sobre el proyecto "Tienda Libre", agregando una nueva sección de "Contacto" para que las personas puedan enviar sus inquietudes. Para ello, construiremos un formulario utilizando Material UI. Utilizando el código base, crearemos un archivo _contact.tsx_ dentro de la carpeta _pages_.

Allí, comenzaremos a construir el formulario, el cual contendrá los siguientes campos:

- Nombre, el cual será in input de tipo texto
- Email, que también será un input pero de este tipo
- País, el cual será un componente de tipo Select que contendrá un listado de todos los paises. Para obtener dicho listado nos apoyaremos en la librería **countries_list**.
- Género, el cual sera un input de tipo radio que permitirá elegir una de las opciones disponibles.
- La sección donde la persona podrá escribir la consulta, que será un textarea
- Y finalmente, in input de tipo checkbox para aceptar los términos y condiciones.

Para finalizar el formulario, tendremos un botón que nos permitirá enviar la consulta (en esta cápsula no es necesario implementar esta funcionalidad).

También aprovecharemos la funcionalidad de i18n que ya se encuentra implementada para hacer que los textos de esta página sean dinámicos en base al idioma seleccionado.

Para comenzar, vamos a importar las dependencias y demás utilidades que emplearemos en este componente:

```jsx
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
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { countries } from "countries-list";
import Radio from "@mui/material/Radio";
import Container from "@mui/material/Container";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useRouter } from "next/router";
import { defaultLocale, TEXTS_BY_LANGUAGE } from "../locale/constants";
```

Antes de comenzar a trabajar con el componente, vamos a obtener el listado de paises que emplearemos más adelante:

```javascript
// Obtenemos el listado de paises y dentro del mismo su nombre
// para mostrar dentro del Select
const countriesValues = Object.values(countries);
const countriesNames = countriesValues.map((country) => country.name);
```

Ahora, creamos nuestro componente y aprovechamos para obtener el idioma y los textos utilizando _useRouter_ y las constantes almacenadas en el proyecto:

```jsx
const Contacto: NextPage = () => {
  // Obtenemos el lenguage utilizando useRoute
  const { locale } = useRouter();

  // Obtenemos los textos utilizando el lenguage seleccionado
  const { CONTACT } =
    TEXTS_BY_LANGUAGE[locale as keyof typeof TEXTS_BY_LANGUAGE] ??
    TEXTS_BY_LANGUAGE[defaultLocale];

  //.....
```

Por su parte, para almacenar el país seleccionado desde el dropdown, vamos utilizar _useState_. Creamos entonces el estado y una función para actualizar el valor cuando la persona seleccione un nuevo país:

```jsx
// Por ahora guardamos el valor elegido dentro de un estado
const [selectedCountry, setCountry] = React.useState("");

// Creamos una función para actualizar el país seleccionado
const handleChange = (event: SelectChangeEvent<string>) => {
  setCountry(event.target.value);
};
```

Ahora si, construimos nuestro formulario utilizando Material UI:

```jsx
// Creamos nuestro formulario de contacto utilizando Material UI
return (
  // Utilizamos Container para centrar el formulario dentro de la página
  <Container maxWidth="sm">
    {/* Utilizando Box creamos el contenedor para el formulario */}
    <Box sx={{ maxWidth: 500, marginTop: 3 }}>
      {/* Utilizamos Paper para crear el efecto relieve */}
      <Paper
        elevation={4}
        sx={{ p: "32px", display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: 24 }}>
          {CONTACT.TITLE}
        </Typography>

        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label={CONTACT.FIELDS.NAME}
            variant="outlined"
            sx={{ width: 1 }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="email"
            id="outlined-basic"
            label={CONTACT.FIELDS.EMAIL}
            variant="outlined"
            sx={{ width: 1 }}
          />
        </Grid>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {CONTACT.FIELDS.COUNTRY}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCountry}
            label={CONTACT.FIELDS.COUNTRY}
            onChange={handleChange}
          >
            {/* Por cada pais de nuestra lista creamos un item dentro del 
                  dropdown */}
            {countriesNames.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            {CONTACT.FIELDS.GENDER}
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
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
          </RadioGroup>
        </FormControl>

        <FormGroup>
          <InputLabel id="demo-simple-select-label">
            {CONTACT.FIELDS.QUESTION}
          </InputLabel>
          <TextareaAutosize aria-label="minimum height" minRows={10} />
        </FormGroup>

        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={CONTACT.FIELDS.TYCS}
          />
        </FormGroup>

        <Button variant="contained" sx={{ width: 1 }}>
          {CONTACT.SEND_BUTTON}
        </Button>
      </Paper>
    </Box>
  </Container>
);
```

De esta manera, si ingresamos a la sección correspondiente veremos nuestro formulario terminado

Ejercicio terminado en la rama [capsula-mod-4-terminado](https://github.com/DH-Esp-Frontend/ctd-fe3-s8-c22-capsulas-tienda-libre/tree/capsula-mod-4-terminado)

## Capsula Modulo 5 - React Hook Form

En esta cápsula vamos a agregar React Hook Form al formulario de contacto del sitio Tienda Libre, integrando esta librería con Material UI. Para ello, utilizaremos las distintas herramientas que React Hook Form nos provee para almacenar los valores, realizar las validaciones y, finalmente, enviar el formulario.

Dentro del archivo _contact.tsx_ que se encuentra en la carpeta **pages**, vamos a importar las dependencias que utilizaremos para completar este ejercicio.

```javascript
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
```

Ahora que tenemos las dependencias, podemos ver que los dos primeros inputs (Nombre y Email), utilizan el mismo componente. Como necesitamos controlarlos utilizando el Controller, vamos a crear un componente "wrapper" que podamos reutilizar en ambos casos:

```jsx
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
```

El siguiente paso, será crear el esquema de validación para nuestro formulario. Para ello, utilizaremos Yup:

```jsx
// Creamos el esquema para realizar nuestras validaciones.
// Para el caso de validacione inválidas, asignamos un mensaje de error
// customizado que traemos en base al idioma seleccionado.
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
```

Ahora que hemos definido nuestro esquema, vamos a utilizar el hook useForm para obtener las variables y métodos que emplearemos para completar la actividad:

```jsx
// Utilizamos el hook useForm para acceder a "control", "handleSubmit"
// y "errors", pasándole el resolver con el esquema que creamos anteriormente.
const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: yupResolver(schema),
});

// Creamos un callback que se ejecutará cuando se envíe el formulario
const onSubmit = (data) => alert(JSON.stringify(data));
```

Con esto, ya estamos en condiciones de modificar nuestro formulario:

```jsx
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
                  {errors.question && <small>{errors.question.message}</small>}
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
```

Una vez finalizado, podremos ver como se aplican las validaciones si intentamos enviarlo con algún campo inválido. Por otra parte, si todos los campos son correctos, veremos el alert con la informacion ingresada.

Ejercicio terminado en la rama [capsula-mod-5-terminado](https://github.com/DH-Esp-Frontend/ctd-fe3-s8-c22-capsulas-tienda-libre/tree/capsula-mod-5-terminado)

## Capsula Modulo 6 - React Hook Form

En esta última cápsula vamos a agregar un campo dinámico a nuestro formulario, que nos permitirá elegir una o más categorías asociadas a nuestra consulta. Para ello, utilizaremos el hook useFieldArray que ya conocemos. Además, agregaremos la validación correspondiente para este nuevo campo.

Las posibles categorías se encuentran dentro de un array de elementos, por lo que cada item del campo dinámico se comportará como un Select.

En primer lugar, agregamos las dependencias que vamos a utilizar en el archivo _contact.tsx_

```jsx
// Importamos Head para poder agregar Google Fonts
import Head from "next/head";
//...
import {
  useForm,
  Controller,
  UseControllerProps,
  useController,
  // Importamos el hook useFieldArray
  useFieldArray,
} from "react-hook-form";
// Importamos el resolver para agregar las validaciones
// Importamos el componente Icon que utilizaremos en nuestro
// campo dinamico
import Icon from "@mui/material/Icon";
```

Ahora, ya que vamos a reutilizar nuestro input en cada elemento que se cree, vamos a crear un componente que podamos reutilizar de forma sencilla:

```jsx
// Creamos un Wrapper para poder reutilizarlo en cada elemento que se cree dentro del campo dinámico
const SelectWrapper = ({
  control,
  name,
  options = [],
  removeItem,
  errors,
  ...props
}: UseControllerProps<SelectProps>) => {
  // Utilizamos el hook useController en reemplazo
  // del componente
  const { field } = useController({
    control,
    name,
  });

  return (
    <>
      <Box
        key={field.id}
        gap={2}
        sx={{
          marginBottom: 2,
          alignItems: "center",
          display: "flex",
        }}
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          sx={{ minWidth: 200 }}
          {...props}
          {...field}
        >
          {/* Creamos el listado de opciones que va dentro del
              dropdown */}
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        {/* Agregamos un botón al lado del input para poder remover el elemento */}
        <Icon color="primary" onClick={removeItem}>
          remove_circle
        </Icon>
      </Box>
      {/* Agregamos un mensaje de error en caso de que lo haya */}
      {errors && <small>{errors.value.message}</small>}
    </>
  );
};
```

Por su parte, vamos a actualizar nuestro _schema_ de validaciones, agregando este nuevo campo:

```jsx
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
    // Agregamos la validación correspondiente para el nuevo campo.
    // Vamos a realizar dos validaciones: primero, que al menos se haya creado
    // 1 elemento y segundo, que cada elemento tenga una opción de las posibles.
    categories: yup
      .array()
      .of(
        yup.object({
          value: yup
            .string()
            .oneOf(
              CONTACT.FIELDS.CATEGORIES_OPTIONS,
              CONTACT.ERRORS.CATEGORIES
            ),
        })
      )
      .min(1, CONTACT.ERRORS.CATEGORIES),
  })
  .required();
```

Con esto, ya estamos preparados para crear nuestro campo dinámico. El primer paso, es utilizar el hook _useFieldArray_ para acceder a las propiedades y métodos que necesitamos:

```jsx
// Utilizando useFieldArray, obtenemos la propiedad "fields" que
// contendrá nuestros elementos. Además, obtenemos los métodos para
// agregar y remover elementos.
const { fields, append, remove } = useFieldArray({
  name: "categories",
  control,
});
```

Por su parte, vamos a crear los callbacks que ejecutaremos al agregar/eliminar elementos

```jsx
// Creamos los callbacks para agregar y remover items
const addItem = () => append({ value: "" });
const removeItem = (index: number) => remove(index);
```

Finalmente, creams nuestro nuevo campo dinámico dentro del formulario:

```jsx
{
  /* Agregamos nuestro nuevo campo dinámico */
}
<FormGroup>
  <InputLabel id="demo-simple-select-label">
    {CONTACT.FIELDS.CATEGORIES}
  </InputLabel>
  {/* Mediante este ícono podemos crear nuevos elementos */}
  <Icon
    color="primary"
    onClick={addItem}
    sx={{ marginBottom: 2, marginTop: 2 }}
  >
    add_circle
  </Icon>
  {/* Recorremos el array de elementos creador y por cada
                    uno creamos un Select utilizando el wrapper que creamos
                    anteriormente */}
  {fields.map((field, index) => (
    <SelectWrapper
      key={field.id}
      name={`categories.${index}.value`}
      placeholder="Nombre del perfil"
      control={control}
      options={CONTACT.FIELDS.CATEGORIES_OPTIONS}
      // Acá verificamos si ese elemento puntual tiene un error
      // y lo pasamos para que pueda mostrarse el mensaje
      errors={errors.categories?.[index]}
      // Le pasamos el callback que va en el botón de remover
      removeItem={() => removeItem(index)}
    />
  ))}
  {/* Aquí creamos un mensaje de error (para todo el campo) y lo mostramos si corresponde */}
  {errors.categories && <small>{errors.categories.message}</small>}
</FormGroup>;
```

Con esto, podemos comprobar como tenemos la posiblidad de agregar/quitar elementos y seleccionar las opciones. Además, podemos probar las distintas validaciones así como verificar el envío del formulario si todos los datos son correctos.

Ejercicio terminado en la rama [capsula-mod-6-terminado](https://github.com/DH-Esp-Frontend/ctd-fe3-s8-c22-capsulas-tienda-libre/tree/capsula-mod-6-terminado)
