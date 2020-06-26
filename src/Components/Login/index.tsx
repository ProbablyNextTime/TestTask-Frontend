import React from "react";
import axios, {AxiosResponse} from "axios"
import { Formik, Form, Field } from 'formik';
import { useHistory } from "react-router-dom"
import * as Yup from 'yup';
import { IUser } from "Interfaces/user"
import { ICredentials } from "Interfaces/user";

// Validation schema for login form
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Too Short!')
    .max(10, 'Too Long!')
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

  return(
    <div>
    <h1>SignIn</h1>
    <Formik
      initialValues={{
        username: "",
        password: ""
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
          <button type="submit">Login</button>
          <button type="button"
            onClick={() => history.push("/signUp")}
          >
            Sign Up
          </button>
          {errorMessage !== "" && <p>{errorMessage}</p>}
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default Login
