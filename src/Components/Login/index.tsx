import React from "react";
import axios, {AxiosResponse} from "axios"
import { Formik, Form, Field } from 'formik';
import { useHistory } from "react-router-dom"
import * as Yup from 'yup';
import {IUser} from "../../Interfaces/user"

interface ICredentials {
  username: string
  password: string
}

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

  const onSubmit =  React.useCallback( async (values: ICredentials) => {
    const response: AxiosResponse = await axios.post('/login', {user: {username: values.username, password: values.password}});
    const user: IUser = response.data.user;
    if(response.status === 200) {
      const redirectURL: string = user.role === "admin" ? "/createPoll" : "/polls";
      history.push(redirectURL);
    }
  }, [history]);

  return(
    <div>
    <h1>Signup</h1>
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
          <Field name="username" />
          <Field name="password" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default Login
