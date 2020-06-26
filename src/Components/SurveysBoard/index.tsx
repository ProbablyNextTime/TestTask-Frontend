import React from "react";
import axios, {AxiosResponse} from "axios"
import { useHistory, Link } from "react-router-dom"
import authHeader from "../../Utils/authHeader";
import {ISurvey} from "../../Interfaces/survey";


const SurveysBoard = () => {
  const history = useHistory();
  const [surveys, setSurveys] = React.useState<ISurvey[]>([]);

  const getSurveys = React.useCallback( async () => {
    const response : AxiosResponse = await axios.get("/surveys", {headers: authHeader()})
    setSurveys(response.data.surveys);
  },[]);

  React.useEffect( () => {
    getSurveys();
  }, [getSurveys]);

  return(
    <div>
      {surveys.map( (survey,key ) => {
        return <> <Link to={`/survey/${survey._id}`} >{survey.tittle}</Link> <br/> </>
      })}
  </div>
  )
}

export default SurveysBoard