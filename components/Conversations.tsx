'use client'

import React, { useEffect, useState } from 'react';
import { List, ListItem, Card } from "@material-tailwind/react";
import { FaAngleRight } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useRecoilState } from 'recoil';
import conversationState from '@/store';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const Conversations: React.FC = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useRecoilState(conversationState);
    const { data: session } = useSession(); 

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await axios.get(`/api/conversations?email=${session?.user?.email}`);
                setConversations(response.data);
            } catch (error) {
                console.error("Error fetching conversations", error);
            }
        };

        if(session?.user?.email){
            fetchConversations();
        }
    }, [session?.user?.email]);

    const handleAddConversation = async () => {
        const newConversationData = {
            title: "New Conversation",
            email: session?.user?.email
        };

        try {
            const response = await axios.post('/api/conversations/create', newConversationData);
            setConversations([...conversations, response.data]);
        } catch (error) {
            console.error("Error adding new conversation", error);
        }
    };

    return (
        <div className="my-4 w-[45] bg-base-200 border-white border-xl">
            <div className="divider h-[0.2rem] bg-base-content rounded-lg"></div>
            <List>
                <ListItem className='mb-6 border-gray-100 border-1'>
                    <div className='w-full text-base-content flex flex-row items-center justify-between border-1 border-base-content'>
                        <p className='font-bold'>Start new chat</p>
                        <IoIosAddCircle className='w-6 h-6' onClick={handleAddConversation} />
                    </div>
                </ListItem>
                {
                    conversations.map((conversation, index) => (
                        <ListItem key={index}>
                            <button onClick={() => setSelectedConversation(conversation.id)} className='w-full text-base-content flex flex-row items-center justify-between'>
                                <p>{conversation.createdAt}</p> {/* Assuming the conversation object has 'title' field */}
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
