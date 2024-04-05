'use client'

import React from 'react';
import { List, ListItem, Card } from "@material-tailwind/react";
import { FaAngleRight } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useRecoilState } from 'recoil';
import conversationState from '@/store'
const Conversations: React.FC = () => {
    const [conversation, setConversation] = useRecoilState(conversationState);
    const conversations = [
        { 'text': 'conversation 1', 'created_at': '2024-03-28T10:00:00' },
        { 'text': 'conversation 2', 'created_at': '2024-03-28T10:30:00' },
        { 'text': 'conversation 3', 'created_at': '2024-03-28T11:00:00' },
        { 'text': 'conversation 4', 'created_at': '2024-03-28T11:30:00' },
    ];
    return (
        <div className="my-4 w-[45] bg-base-200 border-white border-xl">
            <div className="divider h-[0.2rem] bg-base-content rounded-lg"></div>
            <List>
            <ListItem className='mb-6 border-gray-100 border-1'>
                            <div className='w-full  text-base-content  flex flex-row items-center justify-between border-1 border-base-content'>
                                <p className='font-bold'>Start new chat</p>
                                <IoIosAddCircle className='w-6 h-6' />
                                
                            </div>
                        </ListItem>
                {
                    conversations.map((conversation, index) => (
                        <ListItem key={index}>
                            <button onClick={() => setConversation(conversation.text) } className='w-full text-base-content flex flex-row items-center justify-between'>
                                <p>{conversation.text}</p>
                                <FaAngleRight className='w-5 h-5' />
                                
                            </button>
                        </ListItem>
                    ))
                }
            </List>
            <div className="divider h-[0.2rem] bg-base-content rounded-lg"></div>
        </div>
    );
}

export default Conversations;
//onClick={() => setConversation(conversation.text) }