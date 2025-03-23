import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(apikey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export const generateContent = async (req, res) => {
    const { topic } = req.body;
    const prompt = `Write a detailed article about ${topic} in JSON format with title, description, sections, and subsections.`;
  
    try {
      const result = await model.generateContent(prompt);
      let rawText = (await result.response.text())?.trim() || '';
  
      if (!rawText) {
        return res.json({ success: false, error: "AI response is empty.", rawResponse: null });
      }
  
      rawText = rawText.replace(/^```json|```$/g, '').trim();
      console.log(rawText);
      if (!rawText.startsWith('{') && !rawText.startsWith('[')) {
        return res.json({ success: false, error: "Invalid JSON format.", rawResponse: rawText });
      }
  
      const parsedData = JSON.parse(rawText);
      res.json({ success: true, content: parsedData });
    } catch (error) {
      res.json({ success: false, error: error.message, rawResponse: null });
    }
  };