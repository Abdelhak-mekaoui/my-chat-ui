'use client'
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import dynamic from 'next/dynamic';
const Navbar: React.FC = () => {
  const { data: session } = useSession(); 
  const ThemeController = dynamic(() => import('./ThemeController'), {
    ssr: false,
  });
  return (
    <div className="navbar bg-base-200 text-base-content rounded-lg">
      <div className="flex-1">
        <a className="ml-3 text-3xl font-bold">MyChat</a>
      </div>
      <div className="mr-3">
      <ThemeController />
      </div>
      <div className="flex-none gap-2">
        
        {session ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Profile" src={session.user?.image ?? ''} />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><LogoutButton/></li>
            </ul>
          </div>
        ) : (
          <LoginButton/>
        )}
      </div>
    </div>
  );
};

export default Navbar;
