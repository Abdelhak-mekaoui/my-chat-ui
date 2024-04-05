
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
  const Sidebar: React.FC = () => {
    return (
      <Card className="bg-base-200 mt-2 w-full max-w-[15rem] md:max-w-[16rem] lg:max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 ">
       
        <List>
          <ListItem className="text-base-content">
            <ListItemPrefix>
              <MdDashboard  className="h-5 w-5 text-base-content" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
            <Conversations />
          <ListItem className="text-base-content">
            <ListItemPrefix>
              <FaRegUserCircle   className="h-5 w-5 text-base-content" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem className="text-base-content">
            <ListItemPrefix>
              <IoSettingsOutline   className="h-5 w-5 text-base-content" />
            </ListItemPrefix>
            Settings
          </ListItem>
        </List>
      </Card>
    );
  }

  export default Sidebar