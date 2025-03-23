import express from "express";
import { generateContent } from "../services/AIModel.js";
import { generateQuestion } from "../services/questionAllModel.js";

const AiRouter = express.Router();
AiRouter.post('/generate-content',generateContent);
AiRouter.post('/generate-question', generateQuestion);
export default AiRouter;
