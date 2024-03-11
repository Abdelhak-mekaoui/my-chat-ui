'use client';
import React from "react";

type ChatItem = {
  question: string;
  response: string;
};

type ChatBubbleProps = {
  data: ChatItem[];
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <div className='chat chat-end'>
            <div className="chat-bubble">{item.question}</div>
          </div>
          <div className='chat chat-start'>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Chat bot icon"
                  src="https://media.istockphoto.com/id/1413286466/vector/chat-bot-icon-robot-virtual-assistant-bot-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZSG3eqGPDJgIgFUIuVxID64uVUF3eqM3LrrDWtaKses="
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="chat-bubble">{item.response}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ChatBubble;
