// pages/api/conversation/[conversationId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Question, Response as PrismaResponse } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Extract `conversationId` from request query parameters
  const { conversationId } = req.query;

  if (typeof conversationId !== 'string') {
    res.status(400).json({ message: 'Invalid conversation ID' });
    return;
  }

  try {
    // Fetch the conversation including questions and responses
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        questions: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        responses: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!conversation) {
      res.status(404).json({ message: 'Conversation not found' });
      return;
    }
    const messages = conversation.questions.map((question: Question, index: number) => ({
      question: question.text,
      response: (conversation.responses[index] as PrismaResponse)?.text || '',
    }));

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
