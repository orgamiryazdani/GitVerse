'use client';
import { Button } from '../button';
import { useState } from 'react';
import { IoAnalytics } from 'react-icons/io5';
import { RiSearch2Fill } from 'react-icons/ri';
import { useSession } from 'next-auth/react';
import { readData } from '@/core/http-service';
import { FaCodeFork, FaRegStar } from 'react-icons/fa6';

interface repoDataType {
  id: number;
  name: string;
  description: string;
  language: string;
  forks: number;
  stargazers_count: number;
  visibility: string;
  updated_at: string;
}

export const RepoAnalysis: React.FC = () => {
  const session = useSession();
  const [username, setUsername] = useState('');
  const [repositories, setRepositories] = useState<repoDataType[] | []>([]);

  const getUserRepos = async (ownerUsername?: string) => {
    const usernameExtraction = username.startsWith('https://github.com/') ? username.split('/')[3] : username;
    const repository: repoDataType[] = await readData(
      `/users/${ownerUsername ? ownerUsername : usernameExtraction}/repos`
    );
    setRepositories(repository);
  };

  function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const now = new Date();
    const diffInMs: number = now.getTime() - date.getTime();
    const diffInDays: number = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) {
      const weeks: number = Math.floor(diffInDays / 7);
      return `Updated ${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }

    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    };

    return `Updated on ${date.toLocaleDateString('en-US', options)}`;
  }

  return (
    <main className="max-w-8xl w-full h-screen mt-3">
      <section className="w-full h-20 flex items-center justify-center flex-col px-10">
        <h2 className="text-2xl font-bold dark:text-white">آنالیز ریپازیتوری ها و فعالیت های کاربر</h2>
      </section>
      <section className="w-full flex flex-col items-start justify-between h-28 mt-3 px-8">
        <div className="w-full gap-x-4 flex">
          <input
            placeholder="یوزرنیم یا لینک گیت هاب کاربر مورد نظر خود را وارد کنید"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="w-5/6 h-12 rounded-xl px-3 placeholder:text-sm outline-none focus:ring-4 ring-light-400"
          />
          <Button onClick={() => getUserRepos()} variant="light-400" className="w-1/6 text-xl font-semibold">
            جستجو
            <RiSearch2Fill />
          </Button>
        </div>
        <Button onClick={() => getUserRepos(session.data?.user.username)} variant="dark-400" className="text-lg w-full">
          آنالیز صفحه شما
          <IoAnalytics className="text-2xl" />
        </Button>
      </section>
      <section className="flex items-center justify-between mt-5 w-full h-auto px-8 gap-x-7">
        <div className="w-2/5 h-96 rounded-xl bg-dark-300 border-[10px] border-dark-300 overflow-y-auto flex flex-wrap gap-3">
          {repositories.map(({ id, name, description, language, forks, stargazers_count, visibility, updated_at }) => (
            <div key={id} dir="ltr" className="w-full h-auto cursor-pointer bg-dark-400 rounded-2xl ml-1 p-3">
              <div className="flex items-center gap-x-3">
                <p className="text-white font-bold">{name}</p>
                <div className="border border-light-300 text-light-300 text-[11px] flex items-center justify-center h-5 w-12 rounded-2xl">
                  {visibility}
                </div>
              </div>
              <p className="text-xs text-light-300 mt-1">{description}</p>
              <div className="flex w-full text-sm gap-x-3 text-light-300 mt-[10px]">
                <p>{language}</p>
                {stargazers_count > 0 && (
                  <p className="flex gap-x-1">
                    <FaRegStar />
                    {stargazers_count}
                  </p>
                )}
                {forks > 0 && (
                  <p className="flex gap-x-1">
                    <FaCodeFork />
                    {forks}
                  </p>
                )}
                <p>{formatDate(updated_at)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-3/5 h-96 rounded-xl bg-dark-300 border-[10px] border-b-1 border-dark-300 overflow-y-auto flex flex-wrap gap-3"></div>
      </section>
    </main>
  );
};
