import React from "react";
import axios, {AxiosResponse} from "axios"
import { useHistory } from "react-router-dom"
import authHeader from "Utils/authHeader";
import { ISurvey } from "Interfaces/survey";
import {Field, Form, Formik} from "formik";

interface ISurveyProps {
  surveyId: string;
}


const Survey = ({surveyId} : ISurveyProps) => {
  const history = useHistory();
  // State for current survey
  const [survey, setSurvey] = React.useState<ISurvey>();
  // Holds questions which are displayed
  const [currentQuestions, setCurrentQuestions] = React.useState<string[]>([]);
  // Holds current page
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  // Holds possible error/warning message
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  // Validation before going to the next step checks if all the fields
  // that are displayed are not empty
  const isQuestionsSetValid = (from: number, to: number, values: object): boolean => {
    if(survey)
     for(let i = from; i <  to; i++) {
       if (!Object.values(Object.values(values)[0])[i])
         return false;
     }
    return true
  };

  // Display next questions handler
  const handleNext = (values: object) => {
    if(!isQuestionsSetValid((currentPage - 1) * 3, (currentPage) * 3, values)){
      setErrorMessage("Fill all the fields");
      return;
    }
    if(survey)
      setCurrentQuestions(survey.questions.slice(currentPage * 3, (currentPage + 1) * 3));

    setCurrentPage((curPage) => curPage + 1);
  };

  // Display previous questions handler
  const handlePrev = () => {
      if(survey)
        setCurrentQuestions(survey.questions.slice((currentPage - 2) * 3, (currentPage - 1) * 3));

      setCurrentPage( (curPage) => curPage - 1)
  };

  // Return object with survey's questions as keys and
  // empty strings as values for Formik initialValues prop
  const getInitialValues = (): object => {
    let initValues: object = {};
    if(survey)
      for(let i = 0; i < survey.questions.length; i++) {
        const question: object = {[survey.questions[i]]: ""}
        initValues = {...initValues, ...question};
      }
    return initValues;
  }

  // Gets survey from server
  const getSurvey = React.useCallback( async (surveyId: string) => {
    try {
      const response: AxiosResponse = await axios.get(`/survey/?Id=${surveyId}`, {headers: authHeader()});
      setSurvey(response.data.survey);
      setCurrentQuestions(response.data.survey.questions.slice(0, 3));
    } catch  (error) {
      setErrorMessage(error.response.data.message)
    }
  }, [setSurvey]);

  React.useEffect( () => {
    getSurvey(surveyId);

  }, [getSurvey, surveyId]);

  // Survey submit handler
  const submitSurvey = React.useCallback( async (values) => {
    try {
      // Converts values`s  question -- answer pairs to array of answers
      const answers: string[] = Object.values(values);
      await axios.post(`/postSurvey`, {answers: answers, surveyId: surveyId}, {headers: authHeader()});
      history.push("/thankYou");
    } catch (error) {
      console.log(error.response);
      setErrorMessage(error.response.data.message)
    }
  }, [surveyId, history]);

  return(
    <div>
      {survey && <Formik
      initialValues={getInitialValues()}
      onSubmit={submitSurvey}
    >
      {(values) => (
        <Form>
          {currentQuestions.map( (question, key) => {
            return <> <p>{question}</p> <Field onFocus={() => setErrorMessage("")} name={question} /> </>
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
            onClick={() => handleNext(values)}
            disabled={ survey ? Math.ceil(survey.questions.length / 3) === currentPage : false}
          >
            Next
          </button>
          <button
            type={"submit"}
            disabled={ survey ? Math.ceil(survey.questions.length / 3) !== currentPage : false}
          >
            Next
          </button>
          {errorMessage !== "" && <p>{errorMessage}</p>}
        </Form>
      )}
    </Formik>}
  </div>
  )
};

export default Survey
