'use client';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '../_components/button';
import { CiLogout } from 'react-icons/ci';
import { useDictionary } from '@/providers/dictionary-provider';
import { useLang } from '@/providers/language-provider';

const Profile = () => {
  const { data } = useSession();
  const lang = useLang();
  const dict = useDictionary();

  return (
    <>
      <title>{dict.meta_title_profile}</title>
      <meta name="description" content={dict.meta_description_profile} />
      <link rel="canonical" href={`https://git-verse.vercel.app/${lang}/profile`} />
      <div className="w-full h-[89vh] flex items-center justify-center">
        <div className="md:w-3/6 max-w-[800px] w-80 md:h-80 h-96 dark:bg-dark-400 bg-light-400 relative rounded-xl overflow-hidden">
          <div className="w-full md:h-2/5 h-1/3 profile-header-bg"></div>
          <div
            dir="ltr"
            className="absolute md:left-0 left-1/2 -translate-x-1/2 md:-translate-x-0 px-4 md:top-[70%] top-[60%] -translate-y-[70%] dark:text-white text-black md:block flex flex-col items-center text-center md:text-left"
          >
            <Image
              className="rounded-full object-cover border-4 dark:border-white border-dark-100"
              src={data?.user.image || '/images/defaultuser.jpg'}
              alt={data?.user.name || 'user profile'}
              width={150}
              height={150}
            />
            <div>
              <p className="text-2xl font-bold pt-3">{data?.user.name}</p>
              <p className="text-sm dark:text-light-300 text-dark-100 mt-2">{data?.user.username}</p>
              <p className="text-sm dark:text-light-300 text-dark-100 mt-2">{data?.user.email}</p>
            </div>
          </div>
          <Button
            onClick={() => signOut({ callbackUrl: `/${lang}` })}
            variant="light-300"
            className="md:bottom-6 bottom-3 md:right-5 right-1/2 translate-x-1/2 md:translate-x-0 absolute"
          >
            {dict.logout}
            <CiLogout />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Profile;
