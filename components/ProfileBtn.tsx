'use client'
import { ListItem, ListItemPrefix } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { FaRegUserCircle } from "react-icons/fa";

       
       
       export default function ProfileBtn() {
        const router = useRouter()
        //onClick={() => router.push('/profile')}
         return (
           <>
          <ListItem placeholder="adf" className="text-base-content">
          <button onClick={() => router.push('/profile')}>
            <ListItemPrefix placeholder="adf">
              <FaRegUserCircle   className="h-5 w-5 text-base-content" />
            </ListItemPrefix>
            <ProfileBtn />
            </button>
          </ListItem>
           </>
         )
       }
       