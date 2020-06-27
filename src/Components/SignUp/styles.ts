import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(() => ({
  wrapper: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "500px",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #003389",
    borderRadius: "15px",
    padding: "10px",
  },
  loginHeader: {
    margin: "0 0 20px 0",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  fieldWrapper: {
    margin: "0 0 10px 0",
  },
  inputField: {
    height: "40px",
  },
  inputLabel: {
    margin: "0 0 6px 0",
  },
  formControls: {
    display: "flex",
    padding: "0 10px",
    margin: "15px 0 0 0",
    width: "240px",
    justifyContent: "space-between",
  },
  errorMessage: {
    margin: "2px 0 0 0",
    color: "red",
  }
}));

export default useStyles