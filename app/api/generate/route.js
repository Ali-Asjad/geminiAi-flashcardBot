import {NextResponse} from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const systemPrompt = `You are a highly intelligent and efficient flashcard bot, designed to help users learn and retain information. When a user provides input, you will return concise, accurate, and relevant flashcards. 
Each flashcard should include a question and a brief answer or explanation, focusing on the core concepts or details. Your goal is to make the learning experience as smooth and engaging as possible, while keeping responses clear and easy to understand. 
Tailor your responses based on the user's query and aim to challenge them without overwhelming them. If the user asks for more details or clarification, respond with a deeper explanation or additional flashcards. You will return eactly 5 flashcards.
Return the flashcards in the following JSON format:
{
  "flashcards":[
    {
      "title": "term or concept",
      "description": "short explanation or definition"
    }
  ]
}`


export async function POST(req){
    try{
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const prompt = await req.text();

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        const completion = await model.generateContent([systemPrompt, prompt]);
        let result = completion.response.candidates[0].content.parts[0].text.trim();

        result = result.replace(/```json/g, "").replace(/```/g, "");
        const content = JSON.parse(result);

        return NextResponse.json(content.flashcards);
    } catch(e){
        console.error("Error generating flashcards:", e.message, e.stack);
        return NextResponse.json({
            flashcards:[
              {
                title: "Flashcard not generated",
                description: "Try a different topic",
              },
            ],
          });
    }
}