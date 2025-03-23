//AIzaSyC47pmxaHEy9boPd_gRAHssp-r9jvRk6os
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("Your Api key");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ModelFetch = async (prompt) => {
    try {
        console.log("Prompt received:", prompt);

        if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
            throw new Error("Invalid or empty prompt.");
        }

        const result = await model.generateContent(prompt);
        const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!responseText) {
            throw new Error("Invalid response from AI model.");
        }

        console.log("Response received:", responseText);
        return responseText;
    } catch (error) {
        console.error("Error during content generation:", error);
        throw new Error("Error generating content");
    }
};

export const interviewBot = async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ success: false, message: "Question is required" });
    }

    try {
        const prompt = `My question is: "${question}". I want an answer with reason and explanation.`;
        const modelResponse = await ModelFetch(prompt); 

        if (!modelResponse) {
            return res.status(500).json({ success: false, message: "Model couldn't generate an answer" });
        }

        return res.status(200).json({ success: true, data: modelResponse, message: "Response sent successfully" });
    } catch (error) {
        console.error("Error handling request:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const prepareQuestions = async (req, res) => {
    const { topic, noOfQuestions } = req.body;

    try {
        if (!topic || !noOfQuestions) {
            return res.status(400).json({ success: false, message: "Topic or number of questions is missing" });
        }

        const prompt = `Prepare an interview round on the topic "${topic}" with ${noOfQuestions} questions. Provide questions in a numbered list format. only questions till ${noOfQuestions} no extra messed up, and dont start question with the question no be humanize start every question like intereviewer start let start question, move on another question , proceed more like this`;
        const modelResponse = await ModelFetch(prompt);

        if (!modelResponse) {
            return res.status(500).json({ success: false, message: "Model couldn't generate questions" });
        }

        // Extracting questions into an array
        const questionArray = modelResponse.split("\n").filter(q => q.trim() !== "");

        return res.status(200).json({ success: true, data: questionArray, message: "Questions generated successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

export const validateAnswer = async (req,res) => {
    const {question , answer} = req.body;
    try {
        if (!question || !answer) return res.status(404).json({success: false, message: "All the fields are required"});
        const feedBackPrompt = `you are interviewer and for the question : ${question} , validate + review + analyze and give your complete feedback on this answer : ${answer}, short feedback as the interviewer gives after every question in a humanize way and feedback must be completed in 8 sec so keep in mind the length`;
        const feedBackModelResponse = await ModelFetch(feedBackPrompt);
        const pointPrompt = `for the question : ${question} ,  Point rating out of 10 on this answer : ${answer}, only rating nothing else`;
        const pointModelResponse = await ModelFetch(pointPrompt);

        if (!pointModelResponse || !feedBackModelResponse) {
            return res.status(500).json({ success: false, message: "error in the validation" });
        }

        return res.status(201).json({success: true, feedBackRes: {feedBack: feedBackModelResponse}, message: "Successfully Give the response"})
    } catch (error) {
        return res.status(500).json({ success: false, message: "error in the catch block" });
    }
}

export const makeAreport = async (req, res) => {
    const { feedBack } = req.body;

    if (!feedBack) {
        return res.status(400).json({ success: false, message: "all values are required" });
    }

    try {
        const formattedFeedback = feedBack.map((item, index) => 
            `(${index + 1}) Question: ${item.question}, Answer: ${item.answer}, Feedback: ${item.feedback}`
        ).join("\n");

        const prompt = `The following is interview feedback from an interviewer:\n${formattedFeedback}
        Generate a structured report analyzing whether the interviewee's responses were appropriate, 
        if the interviewer was impressed, and the overall interview satisfaction. We want the report in this format and dont give any explaination for your report and just return this json formatted report:
        {
        "Tone": ["Confident", "Professional", "Clear"],
        "Proficiency": {
          "Technical Knowledge": out of 10,
          "Communication Skills": out of 10,
          "Problem Solving": out of 10,
          "Leadership": out of 10
        },
        "Technologies Perfection": {
          "MongoDB": out of 10,
          "Express.js": out of 10,
          "React.js": out of 10,
          "Node.js": out of 10
        },
        "Weak Points": ["Occasional hesitation", "Needs more real-world examples"],
        "Good Points": ["Strong technical foundation", "Clear articulation", "Good problem-solving approach"],
        "Area of Improve": ["Enhance communication fluency", "Use more practical examples", "Improve leadership presence"],
        "Rating": out of 10
        }`;

        const modelResponse = await ModelFetch(prompt);

        if (!modelResponse) {
            return res.status(500).json({ success: false, message: "Failed to generate the report" });
        }

        res.status(200).json({ success: true, report: modelResponse });

    } catch (error) {
        console.error("Error generating report:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const quizMaker = async (req, res) => {
    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ success: false, message: "Topic is required" });
    }

    // AI Prompt
    const prompt = `Generate a JSON formatted quiz with exactly 15 multiple-choice questions on the topic: "${topic}".
    Each question should have four options and one correct answer. 
    Strictly return only valid JSON without explanations or extra text.
    Example format:
    [
      {
        "question": "What is ...?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "answer": "Option B"
      }
    ]`;

    try {
        const modelResponse = await ModelFetch(prompt);

        console.log("Raw AI Response:", modelResponse); 

        if (!modelResponse) {
            return res.status(500).json({ success: false, message: "Failed to generate the quiz" });
        }

        let quizData;
        try {
            const cleanJson = modelResponse.match(/\[.*\]/s)?.[0]; 
            if (!cleanJson) {
                throw new Error("AI did not return valid JSON format.");
            }

            quizData = JSON.parse(cleanJson);

            if (!Array.isArray(quizData) || quizData.length !== 15) {
                throw new Error("Quiz data does not contain exactly 15 questions.");
            }

        } catch (jsonError) {
            console.error("JSON Parsing Error:", jsonError, "AI Response:", modelResponse);
            return res.status(500).json({ success: false, message: "Invalid JSON format from AI model" });
        }

        return res.json({ success: true, quiz: quizData });

    } catch (error) {
        console.error("Error generating quiz:", error);
        return res.status(500).json({ success: false, message: `Error: ${error.message}` });
    }
};
