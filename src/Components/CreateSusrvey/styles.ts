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
    minWidth: "600px",
    border: "1px solid #003389",
    borderRadius: "15px",
    padding: "10px 25px",
    position: "relative",
  },
  formContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    margin: "15px 0 0 0",
    padding: "0 0 60px 0",
  },
  tittleInputContainer: {
    display: "flex",
  },
  inputField: {
    height: "35px",
  },
  divider: {
    margin: "10px 5px",
    height: "1px",
    color: "#003389",
    width: "60%",
  },
  addQuestionButton: {
    position: "absolute",
    left: "40px",
    bottom: "30px",
  },
  createSurveyButton: {
    position: "absolute",
    right: "40px",
    bottom: "30px",
  },
  deleteQButton: {
    height: "35px",
    margin: "0 0 0 10px",
  },
  questionInput: {
    height: "35px",
    width: "350px",
  },
  questionContainer: {
    margin: "0 0 10px 0",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  errorMessage: {
    display: "flex",
    alignSelf: "center",
    justifySelf: "flex-end",
    margin: "10px 0 0 0",
    color: "red",
  },
}))

export default useStyles
