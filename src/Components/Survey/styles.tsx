import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(() => ({
  wrapper: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  answerField: {
    height: "100px",
    width: "500px",
    maxWidth: "700px",
    maxHeight: "150px"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
  },
  formControls: {
    minWidth: "300px",
    display: "flex",
    justifyContent: "space-between",
    padding: "5px"
  },
  surveyQuestion: {
    margin: "0 0 8px 0",
  },
  progress: {
    margin: "10px 0 0 0",
  },
  errorMessage: {
    margin: "2px 0 0 0",
    color: "red",
  }
}));

export default useStyles