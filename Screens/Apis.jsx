import axios from "axios";
import CONFIG from "../ipconfig"; // assuming CONFIG.LAN exists

/* ============================
   AXIOS INSTANCE
============================ */
const api = axios.create({
  baseURL: CONFIG.LAN,
  timeout: 80000,
});

/* ============================
   AUDIO APIs
============================ */

// Voice command (audio upload)
export const voiceCommandAPI = (formData) =>
  api.post("/audio/voice/command", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Transcribe audio
export const transcribeAudioAPI = (audioForm) =>
  api.post("/audio/transcribe", audioForm,
   
    {
    headers: { "Content-Type": "multipart/form-data" },
  });

/* ============================
   NLP APIs
============================ */

export const addRuleAPI = (question) =>
  api.post("/nlp/add-rule", { question });

export const getPosTagsAPI = (question) =>
  api.post("/nlp/get-pos-tags", { question });

export const addVocabularyAPI = (posTag, word) =>
  api.post("/nlp/add-vocabulary", { posTag, word });

export const getRulesAPI = () =>
  api.get("/nlp/get-rules");

export const validateNLPCFGAPI = (question) =>
  api.post("/nlp/validate", { question });

/* ============================
   USERS / AUTH APIs
============================ */

export const loginAPI = (username, password) =>
  api.post("/users/login", { username, password });

export const checkUsernameAPI = (username) =>
  api.post("/users/check-username", { username });

export const getAllAssistantsAPI = () =>
  api.get("/users/assis");

export const getBlindsWithAssistantAPI = () =>
  api.get("/users/blind-with-assistant");

export const getAssistantBlindsAPI = (assistantId) =>
  api.get(`/users/assistant/${assistantId}/blinds`);

/* ============================
   CREATE USERS (FORM DATA)
============================ */

export const createAssistantAPI = (formData) =>
  api.post("/users/assis/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const createBlindAPI = (formData) =>
  api.post("/users/blinds/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

/* ============================
   CONTACTS APIs
============================ */

export const createContactWithPicsAPI = (formData) =>
  api.post("/contacts/create-with-pics", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const ContactsByBlindAPI = (blindId) =>
  api.get(`/contacts/user/${blindId}`);

/* ============================
   HISTORY APIs
============================ */

export const getInteractionHistoryAPI = (assistantId) =>
  api.post(`/history/getHistory/${assistantId}`);

/* ============================
   ANSWER GENERATION
============================ */

export const getAnswerAPI = (blindId, answerForm) =>
  api.post(`/answers/getanswer/${blindId}`, answerForm, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  

/* ============================
   EXPORT AXIOS INSTANCE
============================ */

export default api;
