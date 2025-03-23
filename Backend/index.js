import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from "dotenv";
import connectDb from './config/connection.js';
import UserRouter from './Routers/User.route.js';
import intervoewBotRoute from './Routers/Interviewrouter.route.js';
import AiRouter from './Routers/articleRoute.route.js';
// const cors = require("cors");
//const airoute = require('./Routers/User.route');
dotenv.config();
connectDb();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

// api end point
app.use("/api/users",UserRouter);
app.use("/api/interview",intervoewBotRoute);
app.use('/api/ai' , AiRouter);

const port = 3000;
app.listen(port, function() {
    console.log("Server running at the 3000"); 
})