'use client'
import React from 'react';
import { useSession } from 'next-auth/react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const Navbar: React.FC = () => {
  const { data: session } = useSession(); 
  console.log(session)

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1 text-white font-size-[10]">
        My chat
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
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
