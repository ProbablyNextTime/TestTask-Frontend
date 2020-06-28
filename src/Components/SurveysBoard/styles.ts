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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "500px",
    minWidth: "400px",
    border: "1px solid #003389",
    borderRadius: "15px",
    padding: "10px",
  },
  surveyLink: {
    fontSize: "20px",
    alignSelf: "start",
    margin: "10px 0 0 0",
  },
  errorMessage: {
    margin: "2px 0 0 0",
    color: "red",
  },
}))

export default useStyles
