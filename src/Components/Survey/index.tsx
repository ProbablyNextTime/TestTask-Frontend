import React from "react"
import axios, { AxiosResponse } from "axios"
import { useHistory } from "react-router-dom"
import authHeader from "Utils/authHeader"
import { ISurvey } from "Interfaces/survey"
import { Field, Form, Formik } from "formik"
import useStyles from "./styles"
import { Box, Typography, Button, LinearProgress } from "@material-ui/core"

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
  // Holds possible error/warning message
  const [errorMessage, setErrorMessage] = React.useState<string>("")

  // Validation before going to the next step checks if all the fields
  // that are displayed are not empty
  const isQuestionsSetValid = (from: number, to: number, values: object): boolean => {
    if (survey) {
      for (let i = from; i < to; i++) {
        if (!Object.values(Object.values(values)[0])[i]) {
          return false
        }
      }
    }
    return true
  }

  // Display next questions handler
  const handleNext = (values: object) => {
    if (!isQuestionsSetValid((currentPage - 1) * 3, currentPage * 3, values)) {
      setErrorMessage("Fill all the fields")
      return
    }
    if (survey) {
      setCurrentQuestions(survey.questions.slice(currentPage * 3, (currentPage + 1) * 3))
    }

    setCurrentPage((curPage) => curPage + 1)
  }

  // Display previous questions handler
  const handlePrev = () => {
    if (survey) {
      setCurrentQuestions(survey.questions.slice((currentPage - 2) * 3, (currentPage - 1) * 3))
    }

    setCurrentPage((curPage) => curPage - 1)
  }

  // Return object with survey's questions as keys and
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
        const response: AxiosResponse = await axios.get(`/survey/?Id=${surveyId}`, { headers: authHeader() })
        setSurvey(response.data.survey)
        setCurrentQuestions(response.data.survey.questions.slice(0, 3))
      } catch (error) {
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
        await axios.post("/postSurvey", { answers: answers, surveyId: surveyId }, { headers: authHeader() })
        history.push("/thankYou")
      } catch (error) {
        setErrorMessage(error.response.data.message)
      }
    },
    [surveyId, history]
  )

  const classes = useStyles()
  console.log(survey ? (currentPage - 2) * 3 + currentQuestions.length : 0)
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
              {errorMessage !== "" && <Typography className={classes.errorMessage}>{errorMessage}</Typography>}
              <LinearProgress
                variant={"determinate"}
                value={survey ? (((currentPage - 1) * 3) / survey?.questions.length) * 100 : 0}
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
