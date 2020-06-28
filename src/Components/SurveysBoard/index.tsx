import React from "react"
import { useHistory } from "react-router-dom"
import { ISurvey } from "Interfaces/survey"

import useStyles from "./styles"
import { Box, Typography, Link, Button, CircularProgress } from "@material-ui/core"
import { getAvailableSurveysAPI } from "service/api/survey"
import { UserContext } from "UserContext"

const SurveysBoard = () => {
  const history = useHistory()
  // Holds all available surveys
  const [surveys, setSurveys] = React.useState<ISurvey[]>([])
  // Holds error message if it exists
  const [errorMessage, setErrorMessage] = React.useState("")
  const [loading, setLoading] = React.useState(true)

  const userContext = React.useContext(UserContext)

  // Gets all user`s uncompleted surveys from server
  const getSurveys = React.useCallback(async () => {
    try {
      const surveys: ISurvey[] = await getAvailableSurveysAPI()
      setSurveys(surveys)
    } catch (error) {
      console.error(error)
      setErrorMessage(error.response.body.message)
    }
  }, [])

  React.useEffect(() => {
    const loadSurveys = async () => {
      await getSurveys()
      // set loading to false to display dashboard
      setLoading(false)
    }

    loadSurveys()
  }, [getSurveys, setLoading])

  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      {surveys.length > 0 || userContext.user.role === "admin" ? (
        <Box className={classes.container}>
          <Typography variant={"h4"}>
            {userContext.user.role === "user" ? "Available surveys:" : "Admin dashboard"}
          </Typography>
          {surveys.map((survey, key) => {
            return (
              <>
                {userContext.user.role === "user" ? (
                  <Link
                    className={classes.surveyLink}
                    key={key}
                    component={"button"}
                    onClick={() => history.push(`/survey/${survey._id}`)}
                  >
                    {`${key + 1}) ${survey.title}`}
                  </Link>
                ) : (
                  <Typography className={classes.adminBoardTitle}>{`${key + 1}) ${survey.title}`}</Typography>
                )}
              </>
            )
          })}
          {userContext.user.role === "admin" && (
            <Button
              variant={"outlined"}
              color={"primary"}
              className={classes.createSurveyButton}
              type={"button"}
              onClick={() => history.push("/createSurvey")}
            >
              Create survey
            </Button>
          )}
          {errorMessage && <Typography className={classes.errorMessage}>{errorMessage}</Typography>}
        </Box>
      ) : loading ? (
        <CircularProgress />
      ) : (
        <Typography variant={"h4"}>No surveys are available for you</Typography>
      )}
    </Box>
  )
}

export default SurveysBoard
