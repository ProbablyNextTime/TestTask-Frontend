import React from "react";
import axios, {AxiosResponse} from "axios"
import { Formik, Form, Field } from 'formik';
import { useHistory } from "react-router-dom"
import * as Yup from 'yup';
import { IUser } from "Interfaces/user"
import { ICredentials } from "Interfaces/user";
import useStyles from "./styles";
import {Box, Typography, Button} from "@material-ui/core";
import { TextField } from "formik-material-ui";

// Validation schema for login form
const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Should be longer than 2 characters')
    .max(10, 'Should be shorter than 10 characters')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Should be longer than 4 characters')
    .max(10, 'Should be shorter than 10 characters')
    .required('Required')
});

const Login = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = React.useState("");

  const onSubmit =  React.useCallback( async (values: ICredentials) => {
    try {
      const response: AxiosResponse = await axios.post('/login', {
        user: {
          username: values.username,
          password: values.password
        }
      });
      const user: IUser = response.data.user;
      // Setting accessToken to localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      // Getting user role and redirecting to content pages based on role
      const redirectURL: string = user.role === "admin" ? "/createSurvey" : "/surveys";
      history.push(redirectURL);

    } catch (error) {
      // Handling errors based on error message got from response
      if(error.response.data.message === "Incorrect data"){
        setErrorMessage("Incorrect login or password")
      } else if (error.response.data.message === "Jwt setting failed" ){
        setErrorMessage("Auth error");
      } else {
        setErrorMessage("Unknown error");
      }
    }
  }, [history]);

  const classes = useStyles();

  return(
    <Box className={classes.wrapper}>
      <Box className={classes.container}>
        <Typography className={classes.loginHeader} variant={"h4"}> Login </Typography>
        <Formik
          initialValues={{
            username: "",
            password: ""
          }}
          validationSchema={SignInSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form className={classes.form}>
              <Box className={classes.fieldWrapper}>
                <Typography className={classes.inputLabel}>Username :</Typography>
                <Field
                  name="username"
                  variant={"outlined"}
                  component={TextField}
                  InputProps={{
                    className: classes.inputField
                  }}
                  onFocus={() => setErrorMessage("")}
                />
              </Box>
              <Box className={classes.fieldWrapper}>
                <Typography className={classes.inputLabel}>Password :</Typography>
                <Field
                  name="password"
                  variant={"outlined"}
                  component={TextField}
                  InputProps={{
                     classes: {
                       root: classes.inputField,
                     },
                  }}
                  onFocus={() => setErrorMessage("")}
                />
              </Box>
              <Box className={classes.formControls}>
                <Button
                  type="submit"
                  variant="outlined"
                  color={"primary"}
                >
                  Login
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color={"primary"}
                  onClick={() => history.push("/signUp")}
                >
                  Sign Up
                </Button>
              </Box>
              {errorMessage !== "" && <Typography className={classes.errorMessage}>{errorMessage}</Typography>}
            </Form>
          )}
        </Formik>
      </Box>
  </Box>
  )
}

export default Login
