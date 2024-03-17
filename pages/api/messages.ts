// pages/api/messages.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; // Ensure this path is correct
import { Message } from '@prisma/client';

// You can define a type for the API response if you'd like to have more control over it
type Data = {
  messages: Message[] | null;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    try {
      const messages: Message[] = await prisma.message.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        take: 10,
      });
      res.status(200).json({ messages });
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ messages: null, error: 'Error fetching messages' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
