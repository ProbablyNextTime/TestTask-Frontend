import { ISurvey } from "Interfaces/survey"
import axios from "axios"
import authHeader from "Utils/authHeader"

export const getSurveyAPI = async (surveyId: string): Promise<ISurvey> =>
  ((await axios.get(`/survey/?Id=${surveyId}`, { headers: authHeader() })).data.survey as unknown) as ISurvey

export const postSurveyAPI = async (questions: string[], title: string): Promise<void> =>
  await axios.post("/createSurvey", { questions: questions, title: title }, { headers: authHeader() })

export const postSurveyAnswerAPI = async (answers: string[], surveyId: string): Promise<void> =>
  await axios.post(
    "/postSurvey",
    {
      answers: answers,
      surveyId: surveyId,
    },
    { headers: authHeader() }
  )

export const getAvailableSurveysAPI = async (): Promise<ISurvey[]> =>
  ((
    await axios.get("/surveys", {
      headers: authHeader(),
    })
  ).data.surveys as unknown) as ISurvey[] // Did you properly check that it doesn't work without "as unknown"?
