'use client';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Button } from '../button';
import { SiGithub } from 'react-icons/si';
import Image from 'next/image';
import truncateText from '@/utils/truncateText';

const HeaderUserSection: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      {status === 'loading' ? (
        <div className="w-44 h-12 rounded-xl bg-dark-400"></div>
      ) : session?.user ? (
        <div className="flex items-center gap-x-10">
          <div className="flex items-center justify-center gap-x-3">
            <Image
              width={45}
              height={45}
              className="rounded-full object-cover"
              src={session.user?.image || ''}
              alt={session.user?.name || ''}
            />
            <div className="text-sm">
              {truncateText(session.user?.name || 'کاربر ناشناس', 15)} <br />
              {truncateText(session.user?.email || 'کاربر ناشناس', 15)} <br />
            </div>
          </div>
        </div>
      ) : (
        <Button variant="dark-400" className="px-5 py-5" size="small" onClick={() => signIn('github')}>
          ورود با گیت هاب
          <SiGithub className="text-xl" />
        </Button>
      )}
    </div>
  );
};

export default HeaderUserSection;
