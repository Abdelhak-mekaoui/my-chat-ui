// pages/api/answer.ts
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI();

interface MultipleChoiceQuestion {
  id: string;
  context: string;
  context_v2: string;
  prompt: string;
  options: {
    [key: string]: string;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { id, context, context_v2, prompt, options }: MultipleChoiceQuestion =
      req.body;

    // Create messages array
    const messagess = [
      {
        role: "system",
        content:
          "You are a helpful assistant. Answer the following multiple-choice question.",
      },
      { role: "user", content: prompt },
    ];

    // Add options to the messages
    for (const [key, value] of Object.entries(options)) {
      messagess.push({
        role: "user",
        content: `Option ${key}: ${value}`,
      });
    }

    // Call OpenAI's API
    const completion = await openai.chat.completions.create({
      messages: messagess as any,
      model: "gpt-3.5-turbo",
    });

    const chatBotResponse = completion?.choices[0]; //?.message?.content?.trim();

    const response = {
      answer: chatBotResponse,
    };

    // Return the response
    res.status(200).json(response.answer.message);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ detail: error.message });
  }
};
