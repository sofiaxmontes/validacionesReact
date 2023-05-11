/* useEffect: useEffect es un hook que se utiliza de tres diferentes formas, la primera se utiliza para detectar un cambio, por ejemplo: 
useEffect(() => {
    console.log("UseEffect");
  });

La segunda se utiliza para hacer un update de algún componente, es decir:
useEffect(() => {
    console.log("Se ha actualizado", step);
  }, [step]);

Y finalmente se puede utilizar el useEffect para mandar a llamar APIs, o el backend, a través de funciones asíncronas, por ejemplo:
  useEffect(async () => {
    try {
      const data = await fetch("https://jsonplaceholder.typicode.com/posts");
      const posts = await data.json();
      console.log(posts);
    } catch (e) {
      console.log(e);
    }
  });

*/

import React, { useState, useEffect } from "react";
import { Box, Typography, stepClasses } from "@mui/material";
import { LogoSpace, FormSpace, Img } from "./styles";
import DatosUsuario from "./DatosUsuario";
import DatosPersonales from "./DatosPersonales";
import DatosEntrega from "./DatosEntrega";
import Complete from "./Complete";
import Stepper from "../Stepper";
import Step from "./Step";

//Validaciones
import { validarEmail, validarPassword } from "./DatosUsuario/validaciones";

const Form = () => {
  const [step, setStep] = useState(0);
  const [pasos, setPasos] = useState({});

  useEffect(() => {
    console.log("UseEffect");
  });

  useEffect(() => {
    console.log("Se ha actualizado", step);
  }, [step]);

  const updateStep = (step) => {
    console.log("actualizar paso", step);
    setStep(step);
  };

  const steps = {
    0: <DatosUsuario updateStep={updateStep} />,
    1: <DatosPersonales updateStep={updateStep} />,
    2: <DatosEntrega updateStep={updateStep} />,
    3: <Complete />,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let newStep = step + 1;
    setStep(newStep);
    console.log(newStep);
    console.log(step);
  };

  const handleChange = (element, position, currentStep, validator) => {
    const value = element.target.value;
    const valid = validator(value);
    console.log(value);
    console.log(valid);
    console.log("position", position);
    console.log("currentStep", currentStep);
    console.log("validator", validator);

    stepsFlow[0].inputs[0].label = "Nombre";

    console.log(stepsFlow);
  };

  const stepsFlow = {
    0: {
      inputs: [
        {
          label: "Correo electrónico",
          type: "email",
          value: "",
          valid: null,
          onChange: handleChange,
          helperText: "Ingresa un correo válido.",
          validator: validarEmail,
        },
        {
          label: "Contraseña",
          type: "password",
          value: "",
          valid: null,
          onChange: handleChange,
          helperText:
            "Ingresa una contraseña válida (entre 8 y 20 caracteres).",
          validator: validarPassword,
        },
      ],
      buttonText: "Siguiente",
      onSubmit,
    },
    1: {
      inputs: [
        {
          label: "Correo electrónico",
          type: "email",
          value: "",
          valid: null,
          onChange: handleChange,
          helperText: "Ingresa un correo válido.",
          validator: validarEmail,
        },
        {
          label: "Contraseña",
          type: "password",
          value: "",
          valid: null,
          onChange: handleChange,
          helperText:
            "Ingresa una contraseña válida (entre 8 y 20 caracteres).",
          validator: validarPassword,
        },
      ],
      buttonText: "Siguiente",
      onSubmit,
    },
  };

  return (
    <Box
      sx={{
        padding: "30px",
        display: "flexbox",
        flexDirection: "column",
      }}
    >
      <LogoSpace>
        <Img src={"/favicon.png"} />
        <Typography variant="h3">AluraFood</Typography>
      </LogoSpace>
      <FormSpace>
        {step < 3 && <Stepper step={step} />}
        {/* {steps[step]} */}
        <Step data={stepsFlow[step]} step={step} />
      </FormSpace>
    </Box>
  );
};

export default Form;
