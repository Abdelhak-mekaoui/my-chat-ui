import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { email } = req.query;

    try {
      const conversations = await prisma.conversation.findMany({
        where: {
          email: String(email),
        },
        orderBy: {
          createdAt: 'desc', // Order by createdAt in descending order (newest first)
        },
        take: 10, // Return only the last 10 conversations
      });

      res.status(200).json(conversations);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching conversations' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
