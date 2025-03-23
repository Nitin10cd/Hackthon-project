import express from "express";
import { interviewBot, makeAreport, prepareQuestions, quizMaker, validateAnswer } from "../Controllers/Interviewmodel.controller.js";

const intervoewBotRoute = express.Router();

intervoewBotRoute.post('/askQuestion', interviewBot);
intervoewBotRoute.post('/topicWiseInterviewPrep',prepareQuestions);
intervoewBotRoute.post('/validateAnswer',validateAnswer);
intervoewBotRoute.post('/makeReport', makeAreport);
intervoewBotRoute.post('/makeQuiz',quizMaker);
export default intervoewBotRoute;
