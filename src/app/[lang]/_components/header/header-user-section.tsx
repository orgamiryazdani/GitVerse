'use client';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Button } from '../button';
import { SiGithub } from 'react-icons/si';
import Image from 'next/image';
import truncateText from '@/utils/truncateText';
import { useDictionary } from '@/providers/dictionary-provider';
import Link from 'next/link';

const HeaderUserSection: React.FC = () => {
  const { data: session, status } = useSession();
  const dict = useDictionary();

  return (
    <div>
      {status === 'loading' ? (
        <div className="w-[177px] h-12 bg-dark-300 rounded-xl blur-md"></div>
      ) : session?.user ? (
        <Link href="/fa/profile" className="flex items-center gap-x-10">
          <div className="flex items-center justify-center gap-x-3">
            <Image
              width={45}
              height={45}
              className="rounded-full object-cover"
              src={session.user?.image || ''}
              alt={session.user?.name || ''}
            />
            <div className="text-sm">
              {truncateText(session.user?.name || dict.anonymous_user, 15)} <br />
              {truncateText(session.user?.email || dict.anonymous_user, 15)} <br />
            </div>
          </div>
        </Link>
      ) : (
        <Button variant="light-400" className="px-[27px] py-5" size="small" onClick={() => signIn('github')}>
          {dict.sign_in_with_github}
          <SiGithub className="text-xl" />
        </Button>
      )}
    </div>
  );
};

export default HeaderUserSection;
