import React from "react";
import axios from "axios"
import { Formik, Form, Field } from 'formik';
import { useHistory } from "react-router-dom"
import * as Yup from 'yup';
import {ICredentials} from "Interfaces/user";


// Validation schema for signUp
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Too Short!')
    .max(10, 'Too Long!')
    .required(),
  confirmPassword: Yup.string()
    .min(4, 'Too Short!')
    .max(10, 'Too Long!')
    .required(),
});

const SignUp = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const onSubmit =  React.useCallback( async (values: ICredentials) => {
    try {
      await axios.post("/signUp", {
        user: {
          username: values.username,
          password: values.password
        }
      });
      // redirect on success signUp
      history.push("/login");

    } catch (error) {
      // Handling errors based on error message got from response
      if(error.response.data.message === "such user exists") {
        setErrorMessage("Such user exists");
      } else {
        setErrorMessage("Unknown error");
      }
    }
  }, [history]);

  return(
    <div>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        username: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <p>Username</p>
          <Field
            name="username"
            onFocus={() => setErrorMessage("")}
          />
          <p>Password</p>
          <Field
            name="password"
            onFocus={() => setErrorMessage("")}
          />
          <p>Confirm Password</p>
          <Field
            name="confirmPassword"
            onFocus={() => setErrorMessage("")}
          />
          <button
            type="submit"
          >
            Sign Up</button>
          <button type="button"
            onClick={() => history.push("/login")}
          >
            Login
          </button>
          {errorMessage !== "" && <p>{errorMessage}</p>}
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default SignUp
