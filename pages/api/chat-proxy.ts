// File: pages/api/chat-proxy.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOption } from "./auth/[...nextauth]";
import axios from "axios";

// interface responseType {
//   content: string;
// }

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOption);

  // If there's no session or if the user is not logged in, return an error
  if (!session || !session.user) {
    return res.status(401).json({ messages: null, error: "Unauthorized" });
  }
  if (req.method === "POST") {
    try {
      const {
        conversationId,
        id: questionId,
        context,
        context_v2,
        prompt,
        options,
      } = req.body;
      const user = session.user;

      console.log(JSON.stringify(options));

      const promptWords = prompt.split(" ");
      const firstThreeWords = promptWords.slice(0, 3).join(" ");

      await prisma.conversation.update({
        where: {
          id: conversationId,
        },
        data: {
          title: firstThreeWords,
        },
      });

      // Send request to chatbot API
      const chatbotResponse = await axios.post(
        `${process.env.NEXTAUTH_URL}/api/answer/`,
        {
          // Request body structured as chatbot API expects
          id: questionId,
          context,
          context_v2,
          prompt,
          options,
        }
      );

      await prisma.question.create({
        data: {
          text: prompt as string,
          options: options, // If options are stored as JSON, convert accordingly
          email: user.email,
          conversationId: conversationId,
        },
      });

      await prisma.response.create({
        data: {
          text: chatbotResponse.data.content,
          email: user.email,
          conversationId: conversationId,
        },
      });

      // Respond with chatbot's answer
      res.status(200).json({ answer: chatbotResponse.data.content });
    } catch (e) {
      console.error("Request error", e);
      res
        .status(500)
        .json({
          error:
            "Error communicating with the chatbot or adding data to the database",
        });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
