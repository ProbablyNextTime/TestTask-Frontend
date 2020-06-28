import React from "react"
import { useHistory } from "react-router-dom"
import useStyles from "./styles"
import { Box, Typography, Button } from "@material-ui/core"
import { FieldArray, Form, Field, Formik } from "formik"
import { TextField } from "formik-material-ui"
import * as Yup from "yup"
import { postSurveyAPI } from "../../service/api/survey"
import { UserContext } from "../../UserContext"

// Survey validation schema
const surveySchema = Yup.object().shape({
  questions: Yup.array().of(
    Yup.string().min(5, "Minimum length is 5").required("Required") // these constraints take precedence
  ),
  title: Yup.string().min(4, "Minimum length is 4").max(30, "Maximum length is 30").required("Required"),
})

const CreateSurvey = () => {
  const classes = useStyles()

  const history = useHistory()
  // Holds error message if it exists
  const [errorMessage, setErrorMessage] = React.useState<string>("")
  const userContext = React.useContext(UserContext)

  const handleSurveyCreation = React.useCallback(
    async (values) => {
      // Check if survey contains at least 2 questions
      if (values.questions.length < 2) {
        setErrorMessage("Provide at least 2 questions")
        return
      }

      try {
        // API call fot survey creation
        await postSurveyAPI(values.questions, values.title)
        // Redirect on successful creation of survey
        history.push("/surveys")
      } catch (error) {
        console.error(error)
        setErrorMessage(error.response.data.message)
      }
    },
    [history]
  )

  return (
    <Box className={classes.wrapper}>
      {userContext.user.role === "admin" ? (
        <Box className={classes.container}>
          <Typography variant={"h4"}>Create new survey</Typography>
          <Formik
            initialValues={{
              questions: [],
              title: "",
            }}
            validationSchema={surveySchema}
            onSubmit={handleSurveyCreation}
          >
            {({ values }) => (
              <Form className={classes.formContainer}>
                <Typography variant={"body1"}>Title:</Typography>
                <Field
                  InputProps={{
                    className: classes.inputField,
                  }}
                  type={"text"}
                  name={"title"}
                  variant={"outlined"}
                  component={TextField}
                />
                <hr className={classes.divider} />
                <FieldArray
                  name={"questions"}
                  render={(arrayHelpers) => (
                    <>
                      {
                        //  Display input fields for survey questions
                        values.questions &&
                          values.questions.length > 0 &&
                          values.questions.map((question: string, index) => (
                            <div key={index} className={classes.questionContainer}>
                              <Field
                                name={`questions.${index}`}
                                InputProps={{
                                  classes: {
                                    root: classes.questionInput,
                                  },
                                }}
                                variant={"outlined"}
                                component={TextField}
                              />
                              <Button
                                className={classes.deleteQButton}
                                type="button"
                                variant={"outlined"}
                                color={"secondary"}
                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                              >
                                Remove
                              </Button>
                            </div>
                          ))
                      }
                      <Button
                        className={classes.addQuestionButton}
                        type="button"
                        onClick={() => {
                          arrayHelpers.push("")
                          setErrorMessage("")
                        }}
                        variant={"outlined"}
                        color={"primary"}
                      >
                        Add a question
                      </Button>
                      {errorMessage && <Typography className={classes.errorMessage}>{errorMessage}</Typography>}
                    </>
                  )}
                />
                <Button className={classes.createSurveyButton} type={"submit"} variant={"outlined"} color={"primary"}>
                  Create survey
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      ) : (
        <Typography variant={"h4"}>Not found 404</Typography>
      )}
    </Box>
  )
}

export default CreateSurvey
