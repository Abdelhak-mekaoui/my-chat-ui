import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { unstable_getServerSession } from 'next-auth/next';

import { Message } from '@prisma/client';
import { authOption } from './auth/[...nextauth]';

type Data = {
  messages: Message[] | null;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Retrieve the session using the request
  const session = await unstable_getServerSession(req, res, authOption);

  // If there's no session or if the user is not logged in, return an error
  if (!session || !session.user) {
    return res.status(401).json({ messages: null, error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      // Retrieve messages for the authenticated user
      const messages: Message[] = await prisma.message.findMany({
        where: {
          email: session.user.email, // Use the session's user email to filter messages
        },
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
