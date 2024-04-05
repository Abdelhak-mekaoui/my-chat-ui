import ChatBubble from '@/components/ChatBubble'
import Input from '@/components/Input'
import { authOption } from '@/pages/api/auth/[...nextauth]';
import { Session, getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'



export default async function page() {
  const session = await getServerSession(authOption)

  if(!session){
    redirect('/')
  }
  return (
    <div className="h-full my-2 w-full xl:max-w-3xl mx-auto p-2">
        <ChatBubble />
        <Input />
    </div>
  )
}
