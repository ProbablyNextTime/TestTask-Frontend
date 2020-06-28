import React from "react"
import axios from "axios"
import { Formik, Form, Field } from "formik"
import { useHistory } from "react-router-dom"
import * as Yup from "yup"
import { ICredentials } from "Interfaces/user"
import useStyles from "./styles"
import { Box, Typography, Button } from "@material-ui/core"
import { TextField } from "formik-material-ui"

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
  const [errorMessage, setErrorMessage] = React.useState<string>("")

  const onSubmit = React.useCallback(
    async (values: ICredentials) => {
      try {
        await axios.post("/signUp", {
          user: {
            username: values.username,
            password: values.password,
          },
        })
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
              {errorMessage !== "" && <Typography className={classes.errorMessage}>{errorMessage}</Typography>}
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default SignUp
