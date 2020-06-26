import React from "react";
import axios, {AxiosResponse} from "axios"
import { Link } from "react-router-dom"
import authHeader from "../../Utils/authHeader";
import {ISurvey} from "../../Interfaces/survey";


const SurveysBoard = () => {
  const [surveys, setSurveys] = React.useState<ISurvey[]>([]);

  // Gets all user`s uncompleted surveys from server
  const getSurveys = React.useCallback( async () => {
    const response : AxiosResponse = await axios.get("/surveys", {headers: authHeader()})
    setSurveys(response.data.surveys);
  },[]);


  React.useEffect( () => {
    getSurveys();
  }, [getSurveys]);

  return(
    <div>
      { // display all user`s uncompleted surveys
        surveys.map( (survey,key ) => {
        return <> <Link to={`/survey/${survey._id}`} >{survey.tittle}</Link> <br/> </>
      })}
  </div>
  )
}

export default SurveysBoard
