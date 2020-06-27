import React from "react";
import axios, {AxiosResponse} from "axios"
import { useHistory, Link } from "react-router-dom"
import authHeader from "../../Utils/authHeader";
import {ISurvey} from "../../Interfaces/survey";

interface ISurveyProps {
  surveyId: string;
}

const Survey = ({surveyId} : ISurveyProps) => {
  const history = useHistory();
  const [survey, setSurvey] = React.useState<ISurvey>();
  const [currentQuestions, setCurrentQuestions] = React.useState<string[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const handleNext = () => {
    if(survey)
      setCurrentQuestions(survey.questions.slice(currentPage * 3, (currentPage + 1) * 3));

    setCurrentPage((curPage) => curPage + 1);
  };

  const handlePrev = () => {
      if(survey)
        setCurrentQuestions(survey.questions.slice((currentPage - 2) * 3, (currentPage - 1) * 3));

      setCurrentPage( (curPage) => curPage - 1)
  }

  const getSurvey = React.useCallback( async (surveyId: string) => {
    try {
      const response: AxiosResponse = await axios.get(`/survey/?Id=${surveyId}`, {headers: authHeader()});
      setSurvey(response.data.survey);
      setCurrentQuestions(response.data.survey.questions.slice(0, 3));
    } catch  (error) {
      console.log(error);
    }
  }, [setSurvey]);

  React.useEffect( () => {
    getSurvey(surveyId);
  }, [getSurvey, surveyId]);

  return(
    <div>
      {currentQuestions.map( (question, key) => {
        return <p>{question}</p>
      })}
      <button
        type={"button"}
        onClick={handlePrev}
        disabled={ currentPage === 1}
      >
        Back
      </button>

      <button
        type={"button"}
        onClick={handleNext}
        disabled={ survey ? Math.ceil(survey.questions.length / 3) === currentPage : false}
      >
        Next
      </button>
  </div>
  )
};

export default Survey
