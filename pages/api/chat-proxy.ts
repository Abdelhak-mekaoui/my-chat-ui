// File: pages/api/chat-proxy.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOption } from './auth/[...nextauth]';


const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    
    const session = await getServerSession(req, res, authOption);


    // If there's no session or if the user is not logged in, return an error
    if (!session || !session.user) {
        return res.status(401).json({ messages: null, error: 'Unauthorized' });
    }
    if (req.method === 'POST') {
        try {
          const { conversationId, id: questionId, context, context_v2, prompt, options } = req.body;
          const user = session.user;

          // const updatedConversation = 
          await prisma.conversation.update({
            where: {
              id: conversationId,
            },
            data: {
              title: prompt,
            },
          });
    
          // Send request to chatbot API
          // const chatbotResponse = await axios.post('/api/chat-proxy', {
          //   // Request body structured as chatbot API expects
          //   id: questionId,
          //   context,
          //   context_v2,
          //   prompt,
          //   options,
          // });

          const mockResponse = {
            "id": "question-123",
            "scores": {
            "A": 2.3509186576120555e-05,
            "B": 2.9526812795666046e-05,
            "C": 1.9388247892493382e-05,
            "D": 3.267992360633798e-05,
            "E": 1.546620660519693e-05
            },
            "best_option": "This is response from the proxy till, the model is deployed",
            "num_options": 5
            }
    
          // Chatbot response processing
          const { scores, best_option, num_options } = mockResponse//chatbotResponse.data;
    
          // Store in the database
          // Store question and response in the database
          await prisma.question.create({
            data: {
              text: prompt,
              options: options, // If options are stored as JSON, convert accordingly
              email: user.email,
              conversationId: conversationId,
            },
          });

          await prisma.response.create({
            data: {
              text: best_option, // Assuming this is the full response text
              // options: JSON.stringify(scores), // Include if you want to store the score details
              email: user.email,
              conversationId: conversationId,
            },
          });
    
          // Respond with chatbot's answer
          res.status(200).json({ answer: best_option, questionId, scores });
        } catch (e) {
          console.error('Request error', e);
          res.status(500).json({ error: 'Error communicating with the chatbot or adding data to the database' });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    }
