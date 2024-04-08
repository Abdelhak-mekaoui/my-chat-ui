'use client'

import React, { useEffect, useState } from 'react';
import { List, ListItem, Card } from "@material-tailwind/react";
import { FaAngleRight } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useRecoilState } from 'recoil';
import conversationState from '@/store';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Conversation } from '@prisma/client';
const Conversations: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useRecoilState(conversationState);
    const { data: session } = useSession(); 
    const router = useRouter()

    const fetchConversations = async () => {
        try {
            const response = await axios.get(`/api/conversations?email=${session?.user?.email}`);
            setConversations(response.data);
        } catch (error) {
            console.error("Error fetching conversations", error);
        }
    };


    useEffect(() => {
        fetchConversations()
    }, [session?.user?.email]);

    const handleAddConversation = async () => {
        const newConversationData = {
            title: "New Conversation",
            email: session?.user?.email
        };


        try {
            const response = await axios.post('/api/conversations/create', newConversationData);
            console.log("adding new conv")
            console.log(JSON.stringify(response.data));
            setConversations([...conversations, response.data]);
            fetchConversations()
            router.push('/chat')
            setSelectedConversation(response.data.id)
        } catch (error) {
            console.error("Error adding new conversation", error);
        }
        


    };

    const handleSelectConversation = (id: string) => {
        setSelectedConversation(id)
        router.push('/chat')
    }

    return (
        <div className="my-4 w-[45] bg-base-200 border-white border-xl">
            <div className="divider h-[0.2rem] bg-base-content rounded-lg"></div>
            <List placeholder="d" onPointerEnterCapture={()=>console.log('pointer')} onPointerLeaveCapture={()=>console.log('pointer')}>
                <ListItem placeholder="d" onPointerEnterCapture={()=>console.log('pointer')} onPointerLeaveCapture={()=>console.log('pointer')} className='mb-6 border-gray-100 border-1'>

                    <button onClick={handleAddConversation} className='w-full text-base-content flex flex-row items-center justify-between border-1 border-base-content'>
                        <p className='font-bold'>Start new chat</p>
                        <IoIosAddCircle className='w-6 h-6'  />
                    </button>
                </ListItem>
                {
                    conversations.map((conversation, index) => (
                        <ListItem placeholder="d" onPointerEnterCapture={()=>console.log('pointer')} onPointerLeaveCapture={()=>console.log('pointer')}
                        key={index}
                        className={`${
                            selectedConversation === conversation.id ? 'bg-gray-400 text-gray-900' : 'text-base-content'
                        } w-full flex flex-row items-center justify-between`}
                        onClick={() => handleSelectConversation(conversation.id)}>
                        <p>{conversation.title}</p> 
                        <FaAngleRight className='w-5 h-5' />
                        </ListItem>
                    ))
                    }

            </List>
            <div className="divider h-[0.2rem] bg-base-content rounded-lg"></div>
        </div>
    );
}

export default Conversations;
