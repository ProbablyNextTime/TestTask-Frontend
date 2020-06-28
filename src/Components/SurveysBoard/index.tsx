import React from "react"
import { useHistory } from "react-router-dom"
import { ISurvey } from "Interfaces/survey"

import useStyles from "./styles"
import { Box, Typography, Link, Button } from "@material-ui/core"
import { getAvailableSurveysAPI } from "service/api/survey"
import { UserContext } from "../../UserContext"


const SurveysBoard = () => {
  const history = useHistory()
  const [surveys, setSurveys] = React.useState<ISurvey[]>([])
  const [errorMessage, setErrorMessage] = React.useState<string>("")

  const userContext = React.useContext(UserContext)

  // Gets all user`s uncompleted surveys from server
  const getSurveys = React.useCallback(async () => {
    try {
      const surveys: ISurvey[] = await getAvailableSurveysAPI()
      setSurveys(surveys)
    } catch (error) {
      setErrorMessage(error.response.body.message)
    }
  }, [])

  React.useEffect(() => {
    getSurveys()
  }, [getSurveys])

  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      {surveys.length > 0 ? (
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
          <Button
            variant={"outlined"}
            color={"primary"}
            className={classes.createSurveyButton}
            type={"button"}
            onClick={() => history.push("/createSurvey")}
          >
            Create survey
          </Button>
          {errorMessage && <Typography className={classes.errorMessage}>{errorMessage}</Typography>}
        </Box>
      ) : (
        <Typography variant={"h4"}>No surveys are available for you</Typography>
      )}
    </Box>
  )
}

export default SurveysBoard
