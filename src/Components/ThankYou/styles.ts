import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(() => ({
  wrapper: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    margin: "20px 0 0 0",
  },
}))

export default useStyles
