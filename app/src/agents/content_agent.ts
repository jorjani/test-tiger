import dotenv from "dotenv";
import { OpenAI } from "openai";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function runContentAgent(content: string) {
  try {
    const prompt = `Evaluate the following web content:\n\n${content}\n\nRate clarity and tone on a 1–5 scale and provide a short comment.`;

    const res = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }]
    });

    return {
      status: "ok",
      evaluation: res.choices[0].message.content
    };
  } catch (err) {
    return {
      status: "fail",
      error: (err as Error).message
    };
  }
}
