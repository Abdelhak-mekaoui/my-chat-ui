import { authOption } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'
import React from 'react';

const UserProfilePage: React.FC = async () => {
    const session = await getServerSession(authOption)

  if(!session){
    redirect('/')
  }
  return (
    <div className="card mx-auto text-neutral-content py-4">
      <div className="avatar mx-auto">
        <div className="w-24 rounded-xl my-6">
            <img alt='daf' src={session?.user?.image} />
        </div>
    </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium">
              Full name
            </dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              {session?.user?.name}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium ">
              Email address
            </dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
            {session?.user?.email}
            </dd>
          </div>
        
        </dl>
      </div>
    </div>
  );
};

export default UserProfilePage;
