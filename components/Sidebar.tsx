
'use client'
import React from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
  import { MdDashboard } from "react-icons/md";
  import { FaRegUserCircle } from "react-icons/fa";
  import { IoSettingsOutline } from "react-icons/io5";
import Conversations from "./Conversations";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
  const Sidebar: React.FC = () => {
    const { data: session } = useSession(); 
    const router = useRouter();
    if (!session) return <Card placeholder="d" onPointerEnterCapture={()=>console.log('pointer')} onPointerLeaveCapture={()=>console.log('pointer')} className="bg-base-200 mt-2 w-full max-w-[15rem] md:max-w-[16rem] lg:max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 "><span className="mx-auto my-auto">Please log in to use the app</span>
  </Card>;

    return (
      <Card placeholder="d" onPointerEnterCapture={()=>console.log('pointer')} onPointerLeaveCapture={()=>console.log('pointer')} className="bg-base-200 mt-2 w-full max-w-[15rem] md:max-w-[16rem] lg:max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 ">
       
        <List placeholder="d" onPointerEnterCapture={()=>console.log('pointer')} onPointerLeaveCapture={()=>console.log('pointer')}>
          <ListItem placeholder="d" onPointerEnterCapture={()=>console.log('pointer')} onPointerLeaveCapture={()=>console.log('pointer')} className="text-base-content">
          <button onClick={() => router.push('/')} className="flex flex-row">
            <ListItemPrefix placeholder="d" onPointerEnterCapture={()=>console.log('pointer')} onPointerLeaveCapture={()=>console.log('pointer')}>
              <MdDashboard  className="h-5 w-5 text-base-content" />
            </ListItemPrefix>
            Dashboard</button>
          </ListItem>
            <Conversations />
          <ListItem placeholder="d" onPointerEnterCapture={()=>console.log('pointer')} onPointerLeaveCapture={()=>console.log('pointer')} className="text-base-content">
            <button onClick={() => router.push('/profile')} className="flex flex-row">
            <ListItemPrefix placeholder="d" onPointerEnterCapture={()=>console.log('pointer')} onPointerLeaveCapture={()=>console.log('pointer')}>
              <FaRegUserCircle   className="h-5 w-5 text-base-content" />
            </ListItemPrefix>
            Profile
            </button>
          </ListItem>
          <ListItem placeholder="d" onPointerEnterCapture={()=>console.log('pointer')} onPointerLeaveCapture={()=>console.log('pointer')} className="text-base-content">
          <button onClick={() => router.push('/settings')} className="flex flex-row">

            <ListItemPrefix placeholder="d" onPointerEnterCapture={()=>console.log('pointer')} onPointerLeaveCapture={()=>console.log('pointer')}>
              <IoSettingsOutline   className="h-5 w-5 text-base-content" />
            </ListItemPrefix>
            Settings</button>
          </ListItem>

        </List>
      </Card>
    );
  }

  export default Sidebar