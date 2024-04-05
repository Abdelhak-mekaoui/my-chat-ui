'use client'

import React, { useEffect, useState } from "react";
import Image from 'next/image';
import Logo from '@/public/logo.png';
import { useSession } from "next-auth/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
} from "@material-tailwind/react";
interface ChatItem {
  question: string;
  response: string;
}

interface ChatBubbleProps {}

const ChatBubble: React.FC<ChatBubbleProps> = () => {
  const { data: session } = useSession(); 
  const [messages, setMessages] = useState<ChatItem[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!session) return;

      try {
        const response = await fetch('/api/messages');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setMessages((data.messages || []).reverse());
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    // Fetch messages immediately on mount and set up a timer to fetch them repeatedly
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 1000); // Adjust the interval as needed

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [session]);

  return (
    <Card className="shadow-blue-gray-900/5 h-[60vh] bg-base-200">
      <ScrollArea className="p-4 border-solid">
        {messages.slice(0, 10).map((item, index) => (
          <React.Fragment key={index}>
            <div className='chat chat-end'>
              <div className="chat-bubble">{item.question}</div>
            </div>
            <div className='chat chat-start '>
              <div className="chat-image avatar">
                <div className="w-17 rounded-full">
                  <Image
                    alt="Chat bot icon"
                    src={Logo}
                    width={45}
                    height={45}
                    className="rounded-full bg-white border-solid"
                  />
                </div>
              </div>
              <div className="chat-bubble">
                {item.response ? (
                  item.response
                ) : (
                  <span className="loading loading-dots loading-lg"></span>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </ScrollArea>
    </Card>
  );
};

export default ChatBubble;
