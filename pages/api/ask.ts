// pages/api/ask.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOption } from './auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getServerSession(authOption)
  if (req.method === 'POST') {
    // Extracting the question and options from the request body
    const { id, context, context_v2, prompt, options } = req.body;

    try {
      const llmResponse = await sendQuestionToLLM({
        id,
        context,
        context_v2,
        prompt,
        options,
      });

      // Assuming llmResponse returns an object { answer: string }
      const answer = llmResponse.answer;

      // Storing the data in the Message model using Prisma
      const message = await prisma.message.create({
        data: {
          question: prompt,
          response: answer,
          options: options,
          email: session.user?.email, 
        },
      });

      // Responding with the LLM answer
      res.status(200).json({ answer });
    } catch (error) {
      console.error('Request to LLM or database failed:', error);
      res.status(500).json({ error: 'Error processing your question' });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// You might need to import Axios at the beginning of your file if it's not already there
import axios from 'axios';

async function sendQuestionToLLM(questionPayload: any): Promise<{ answer: string, id: string }> {
  try {
    // Replace with the actual URL of the LLM service
    const llmServiceUrl = 'http://chat-app-lb-1984454339.us-east-1.elb.amazonaws.com:8000/predict';
    
    // Send the POST request to the LLM service
    const { data } = await axios.post(llmServiceUrl, questionPayload);

    // Returning the 'best_option' from the response as 'answer'
    return { answer: data.best_option, id: data.id };
  } catch (error) {
    // If there's an error, throw it so the calling function can handle it
    throw error;
  }
}
