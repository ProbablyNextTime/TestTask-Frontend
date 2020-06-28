import React from "react"
import { Formik, Form, Field } from "formik"
import { useHistory } from "react-router-dom"
import * as Yup from "yup"
import { ICredentials } from "Interfaces/user"
import useStyles from "./styles"
import { Box, Typography, Button } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import { signUpUserAPI } from "../../service/api/user" // abs path

// Validation schema for signUp
const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Should be longer than 2 characters")
    .max(10, "Should be shorter than 10 characters")
    .required("Required"),
  password: Yup.string()
    .min(4, "Should be longer than 4 characters")
    .max(10, "Should be shorter than 10 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords should match")
    .required("Required"),
})

const SignUp = () => {
  const history = useHistory()
  // Holds error message if it exists
  const [errorMessage, setErrorMessage] = React.useState("") // <string> can be inferred from ""

  const onSubmit = React.useCallback(
    async (values: ICredentials) => {
      try {
        // API call to register new user
        await signUpUserAPI(values.username, values.password)
        // redirect on success signUp
        history.push("/login")
      } catch (error) {
        setErrorMessage(error.response.data.message)
      }
    },
    [history]
  )

  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.container}>
        <Typography className={classes.loginHeader} variant={"h4"}>
          Sign Up
        </Typography>
        <Formik
          initialValues={{
            username: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <Box className={classes.fieldWrapper}>
                <Typography className={classes.inputLabel}>Username :</Typography>
                <Field
                  InputProps={{
                    className: classes.inputField,
                  }}
                  variant={"outlined"}
                  name="username"
                  onFocus={() => setErrorMessage("")}
                  component={TextField}
                />
              </Box>
              <Box className={classes.fieldWrapper}>
                <Typography className={classes.inputLabel}>Password :</Typography>
                <Field
                  InputProps={{
                    className: classes.inputField,
                  }}
                  variant={"outlined"}
                  type={"password"}
                  name="password"
                  onFocus={() => setErrorMessage("")}
                  component={TextField}
                />
              </Box>
              <Box className={classes.fieldWrapper}>
                <Typography className={classes.inputLabel}>Confirm Password :</Typography>
                <Field
                  InputProps={{
                    className: classes.inputField,
                  }}
                  variant={"outlined"}
                  name="confirmPassword"
                  type={"password"}
                  onFocus={() => setErrorMessage("")}
                  component={TextField}
                />
              </Box>
              <Box className={classes.formControls}>
                <Button color={"primary"} type="submit" variant="outlined">
                  Sign Up
                </Button>
                <Button color={"primary"} type="button" variant="outlined" onClick={() => history.push("/login")}>
                  Login
                </Button>
              </Box>
              {errorMessage && <Typography className={classes.errorMessage}>{errorMessage}</Typography>}
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default SignUp
