import { ISurvey } from "Interfaces/survey"
import axios from "axios"
import authHeader from "Utils/authHeader"
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || ''
axios.defaults.withCredentials = true;
function setAuthToken(token: string) {
  axios.defaults.headers.common['Authorization'] = '';
  delete axios.defaults.headers.common['Authorization'];

  if (token) {
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
  }
}

export const getSurveyAPI = async (surveyId: string): Promise<ISurvey> => {
  const auth: string = localStorage.getItem("accessToken") || "";
  setAuthToken(auth)
  return((await axios.get(`/surveys/?Id=${surveyId}` )).data.survey as unknown) as ISurvey
}

export const postSurveyAPI = async (questions: string[], title: string): Promise<void> => {
  const auth: string = localStorage.getItem("accessToken") || "";
  setAuthToken(auth)
  await axios.post("/surveys", {questions: questions, title: title})
}

export const postSurveyAnswerAPI = async (answers: string[], surveyId: string): Promise<void> => {
    const auth: string = localStorage.getItem("accessToken") || "";
  setAuthToken(auth)
  return await axios.post(
    "/surveys/postAnswer/",
    {
      answers: answers,
      surveyId: surveyId,
    }
  )
}

export const getAvailableSurveysAPI = async (): Promise<ISurvey[]> => {
  const auth: string = localStorage.getItem("accessToken") || "";
  setAuthToken(auth)
  return ((
    await axios.get("/surveys")
  ).data.surveys as unknown) as ISurvey[]
}
