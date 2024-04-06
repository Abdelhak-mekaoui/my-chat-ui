import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, email } = req.body;

    if (!title || !email) {
      return res.status(400).json({ error: 'Title and email are required' });
    }

    try {
      const conversation = await prisma.conversation.create({
        data: {
          title,
          email: email,
        },
      });

      res.status(201).json(conversation);
    } catch (error) {
      res.status(500).json({ error: 'Error creating new conversation' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
