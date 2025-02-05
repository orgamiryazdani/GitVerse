'use client';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '../_components/button';
import { CiLogout } from 'react-icons/ci';
import { useDictionary } from '@/providers/dictionary-provider';

const Profile = () => {
  const { data } = useSession();
  const dict = useDictionary();

  return (
    <div className="w-full h-[89vh] flex items-center justify-center">
      <div className="w-3/6 h-80 bg-dark-400 relative rounded-xl overflow-hidden">
        <div className="w-full h-2/5 profile-header-bg"></div>
        <div dir="ltr" className="absolute left-0 px-4 top-[70%] -translate-y-[70%] text-white">
          <Image
            className="rounded-full object-cover border-4 border-white"
            src={data?.user.image || '/images/defaultuser.jpg'}
            alt={data?.user.name || 'user profile'}
            width={150}
            height={150}
          />
          <div>
            <p className="text-2xl font-bold pt-3">{data?.user.name}</p>
            <p className="text-sm text-light-300 mt-2">{data?.user.username}</p>
            <p className="text-sm text-light-300 mt-2">{data?.user.email}</p>
          </div>
        </div>
        <Button onClick={() => signOut({ callbackUrl: '/' })} variant="light-300" className="bottom-6 right-5 absolute">
          {dict.logout}
          <CiLogout />
        </Button>
      </div>
    </div>
  );
};

export default Profile;
