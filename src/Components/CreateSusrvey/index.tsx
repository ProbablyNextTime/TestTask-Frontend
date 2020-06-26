import React from "react";
import axios from "axios"
import { useHistory } from "react-router-dom"
import authHeader from "Utils/authHeader";

const CreateSurvey = () => {
  const history = useHistory();
  const [surveyQuestions, setSurveyQuestions] = React.useState<string[]>([]);
  const [errorMessage, setErrorMessage] = React.useState<string>("")

  // React ref for access to the add new question input
  const newQuestionInput = React.createRef<HTMLInputElement>();

  const handleAddQuestion = React.useCallback(  () => {
    if(newQuestionInput.current) {
      const newQuestion =  newQuestionInput.current.value;
      setSurveyQuestions(questions => [...questions, newQuestion])
      // Set input value to empty string after adding a new question to survey questions
      newQuestionInput.current.value = "";
      newQuestionInput.current.focus();
    }
  }, [newQuestionInput]);


  const handleSurveyCreation = React.useCallback( async (event) => {
    // Prevent page from reloading
    event.preventDefault();
    if(surveyQuestions.length === 0) {
      setErrorMessage("No questions were provided");
      return;
    }

    try {
      await axios.post("/createSurvey", {questions: surveyQuestions, tittle: event.target.tittle.value}, {headers: authHeader()})
      // Redirect on successful creation of survey
      history.push("/surveys")
    } catch (error) {
        if(error.response.data.message === "such tittle already exists")
          setErrorMessage("Such tittle already exists");
        else if (error.response.data.message === "Mo questions were provided")
          setErrorMessage("No questions were provided")
        else
          setErrorMessage("Unknown error");
    }
  }, [surveyQuestions, history]);

  return(
    <div>
      <div>
      {// display all added survey questions
        surveyQuestions.map( (surveyQuestion, key) => {
        return <p>{key})  --- {surveyQuestion}</p>
      })}
      </div>

      <h2>Add quest</h2>
      <form onSubmit={handleSurveyCreation}>
        <input minLength={5} maxLength={100} type={"text"} ref={newQuestionInput}>
        </input>
        <h4>name</h4>
        <input
          type={"text"}
          name={"tittle"}
        >
        </input>
        <button
          type={"button"}
          onClick={handleAddQuestion}
        >
          Add question
        </button>

        <button
          type={"submit"}
        >
          Create survey
        </button>
        {errorMessage !== "" && <p>{errorMessage}</p>}
      </form>
  </div>
  )
};

export default CreateSurvey