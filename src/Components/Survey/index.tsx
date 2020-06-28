import React from "react"
import { useHistory } from "react-router-dom"
import { ISurvey } from "Interfaces/survey"
import { Field, Form, Formik } from "formik"
import useStyles from "./styles"
import { Box, Typography, Button, LinearProgress } from "@material-ui/core"
import { getSurveyAPI, postSurveyAnswerAPI } from "service/api/survey"

interface ISurveyProps {
  surveyId: string
}

const Survey = ({ surveyId }: ISurveyProps) => {
  const history = useHistory()
  // State for current survey
  const [survey, setSurvey] = React.useState<ISurvey>()
  // Holds questions which are displayed
  const [currentQuestions, setCurrentQuestions] = React.useState<string[]>([])
  // Holds current page
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  // Holds error message if it exists
  const [errorMessage, setErrorMessage] = React.useState<string>("")

  // Validation before going to the next step checks if all the fields
  // that are displayed are not empty
  const isQuestionsSetValid = (from: number, to: number, values: object): boolean => {
    if (survey) {
      // values is object that has property 'values' with object (which values is our answers)
      const answers: string[] = Object.values(Object.values(values)[0])
      for (let i = from; i < to; i++) {
        if (!answers[i]) {
          return false
        }
      }
    }
    return true
  }

  // Display next questions handler
  const handleNext = (values: object) => {
    // Check if all the questions that are displayed have an answer
    if (!isQuestionsSetValid((currentPage - 1) * 3, currentPage * 3, values)) {
      setErrorMessage("Fill all the fields")
      return
    }

    if (survey) {
      // If everything is valid set next set of questions
      setCurrentQuestions(survey.questions.slice(currentPage * 3, (currentPage + 1) * 3)) // These are magic numbers to me. The comment above fails to explain what's questions.slice(currentPage * 3, (currentPage + 1) * 3)
    }

    // increment current page
    setCurrentPage((curPage) => curPage + 1)
  }

  // Display previous questions handler
  const handlePrev = () => {
    if (survey) {
      // set previous set of questions
      setCurrentQuestions(survey.questions.slice((currentPage - 2) * 3, (currentPage - 1) * 3)) // Magic numbers
    }

    // decrement current page
    setCurrentPage((curPage) => curPage - 1)
  }

  // Returns object with survey's questions as keys and
  // empty strings as values for Formik initialValues prop
  const getInitialValues = (): object => {
    let initValues: object = {}
    if (survey) {
      for (let i = 0; i < survey.questions.length; i++) {
        const question: object = { [survey.questions[i]]: "" }
        initValues = { ...initValues, ...question }
      }
    }
    return initValues
  }

  // Gets survey from server
  const getSurvey = React.useCallback(
    async (surveyId: string) => {
      try {
        // API call to get survey
        const survey: ISurvey = await getSurveyAPI(surveyId)
        setSurvey(survey)
        // set start questions
        setCurrentQuestions(survey.questions.slice(0, 3))
      } catch (error) {
        // console.error. If you don't do that you'll never know what's the real error
        setErrorMessage(error.response.data.message)
      }
    },
    [setSurvey]
  )

  React.useEffect(() => {
    getSurvey(surveyId)
  }, [getSurvey, surveyId])

  // Survey submit handler
  const submitSurvey = React.useCallback(
    async (values) => {
      try {
        // Converts values`s  question -- answer pairs to array of answers
        const answers: string[] = Object.values(values)
        // API call ot post survey answers
        await postSurveyAnswerAPI(answers, surveyId)
        // Redirect on success
        history.push("/thankYou")
      } catch (error) {
        setErrorMessage(error.response.data.message)
      }
    },
    [surveyId, history]
  )

  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      {survey && (
        <Formik initialValues={getInitialValues()} onSubmit={submitSurvey}>
          {(values) => (
            <Form className={classes.container}>
              {currentQuestions.map((question, index) => {
                return (
                  <Box key={index} className={classes.surveyQuestion}>
                    <Typography>{question}</Typography>
                    <Field
                      className={classes.answerField}
                      variant={"outlined"}
                      onFocus={() => setErrorMessage("")}
                      name={question}
                      component={"textarea"}
                    />
                  </Box>
                )
              })}

              <Box className={classes.formControls}>
                <Button
                  color={"primary"}
                  variant={"outlined"}
                  type={"button"}
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                >
                  Back
                </Button>
                {survey && Math.ceil(survey.questions.length / 3) === currentPage && (
                  <Button color={"primary"} variant={"outlined"} type={"submit"}>
                    Submit
                  </Button>
                )}

                {survey && Math.ceil(survey.questions.length / 3) !== currentPage && (
                  <Button color={"primary"} variant={"outlined"} type={"button"} onClick={() => handleNext(values)}>
                    Next
                  </Button>
                )}
              </Box>
              {errorMessage && <Typography className={classes.errorMessage}>{errorMessage}</Typography>}
              <LinearProgress
                variant={"determinate"}
                value={survey ? (((currentPage - 1) * 3) / survey?.questions.length) * 100 : 0} // Magic numbers. Maybe create some constants to make it more coherent
                className={classes.progress}
              />
            </Form>
          )}
        </Formik>
      )}
    </Box>
  )
}

export default Survey
