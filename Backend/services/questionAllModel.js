import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(apikey);
const model = genAI.getGenerativeModel({
    model : "gemini-2.0-flash"
});

export const generateQuestion = async (req, res) => {
    try {
      const { topic } = req.body;
      const prompt = `Generate at least 10 interview questions on ${topic} in JSON format with questions, answers, and explanations.`;
      
      const result = await model.generateContent(prompt);
      let rawText = (await result.response.text()).trim();
      
      rawText = rawText.replace(/^```json|```$/g, '').trim();
      
      if (!rawText.startsWith('{') && !rawText.startsWith('[')) {
        return res.json({ success: false, error: "Invalid JSON format.", rawResponse: rawText });
      }
  
      const parsedData = JSON.parse(rawText);
      res.json({ success: true, content: parsedData });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  };