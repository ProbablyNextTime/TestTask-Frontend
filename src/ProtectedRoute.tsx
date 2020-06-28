import * as React from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"
import PropTypes from "prop-types"

// THIS SHOULD BE IN THE SAME FOLDER AS THE RAOUTES COMPONENT NOT in ./src

// A wrapper around react-router-dom Route for easier handling of private routes
// via isPrivate boolean flag
interface IRouteWrapperProps<T> extends RouteProps {
  component?: React.FC<T>
  isPrivate: boolean
}

const isLoggedIn = (): boolean => {
  return (localStorage.getItem("accessToken") as unknown) as boolean
}

export default function RouteWrapper<T>({ component, isPrivate, ...rest }: IRouteWrapperProps<T>) {
  // A wrapper component around the react-router-dom Route that controls access to resources
  // isPrivate flag should be used to make the Route available only to logged in users
  // if user isn`t logged in redirect to /login
  if (isPrivate && !isLoggedIn()) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} component={component} />
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
}

RouteWrapper.defaultProps = {
  isPrivate: false,
}
