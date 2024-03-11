import ChatBubble from '@/components/ChatBubble'
import Input from '@/components/Input'
import prisma from '@/lib/prisma'
import { authOption } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
const data = [
    {
      question: "example question 1",
      response: "example response1",
    },
    {
      question: "example question 2",
      response: "example response2",
    },
    {
      question: "example question 3",
      response: "example response3",
    },
    {
      question: "example question 3",
      response: "example response3",
    },
    {
      question: "example question 1",
      response: "example response1",
    },
    
  ];

  // Fetch the last 20 messages
async function getLast20Messages() {
    try {
      const messages = await prisma.message.findMany({
        take: 20,
        orderBy: {
          createdAt: 'desc',
        },
      });
  
      // Convert messages to the desired format
      const formattedMessages = messages.map((message) => ({
        question: message.question,
        response: message.response,
      }));
  
      return formattedMessages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    } finally {
      await prisma.$disconnect(); // Disconnect the Prisma client
    }
  }


export default async function page() {
  const session = await getServerSession(authOption)

  if(!session){
    redirect('/')
  }
    const messages = getLast20Messages()
    console.log(messages)
  return (
    <div className="h-screen my-2 max-w-3xl mx-auto">
        <ChatBubble data={data} />
        <Input />
    </div>
  )
}
