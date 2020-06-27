import React from "react";
import axios, {AxiosResponse} from "axios"
import { useHistory } from "react-router-dom"
import authHeader from "Utils/authHeader";
import {ISurvey} from "Interfaces/survey";

import useStyles from "./styles";
import {Box, Typography, Link} from "@material-ui/core";


const SurveysBoard = () => {
  const history = useHistory();
  const [surveys, setSurveys] = React.useState<ISurvey[]>([]);

  // Gets all user`s uncompleted surveys from server
  const getSurveys = React.useCallback( async () => {
    const response : AxiosResponse = await axios.get("/surveys", {headers: authHeader()})
    setSurveys(response.data.surveys);
  },[]);


  React.useEffect( () => {
    getSurveys();
  }, [getSurveys]);

  const classes = useStyles();

  return(
    <Box className={classes.wrapper}>
      {surveys.length > 0 ?
        <Box className={classes.container}>
          <Typography variant={"h4"}>Available surveys:</Typography>
          {surveys.map( (survey,key ) => {
            return <Link
              className={classes.surveyLink}
              key={key}
              component={"button"}
              onClick={() => history.push(`/survey/${survey._id}`)}
            >
              {`${key + 1}) ${survey.tittle}`}
            </Link>
          })}
        </Box>
          : <Typography variant={"h4"}>No surveys are available for you</Typography>}
    </Box>
  )
}

export default SurveysBoard
