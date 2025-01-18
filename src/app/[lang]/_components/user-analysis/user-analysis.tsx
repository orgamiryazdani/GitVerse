'use client';
import { Button } from '../button';
import { useState } from 'react';
import { readData } from '@/core/http-service';
import { MdAutorenew } from 'react-icons/md';
import { IoAnalytics } from 'react-icons/io5';
import { RiSearch2Fill, RiUserUnfollowLine } from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';
import truncateText from '@/utils/truncateText';
import { useSession } from 'next-auth/react';

interface dataType {
  followers: {
    id: number;
    html_url: string;
    avatar_url: string;
    login: string;
  }[];
  following: {
    id: number;
    html_url: string;
    avatar_url: string;
    login: string;
  }[];
}

interface userType {
  id: number;
  html_url: string;
  avatar_url: string;
  login: string;
}

export const UserAnalysis: React.FC = () => {
  const session = useSession();
  const [username, setUsername] = useState('');
  const [data, setData] = useState<dataType>({
    followers: [],
    following: [],
  });
  const [unFollowed, setUnFollowed] = useState<userType[]>([]);
  const [tabActive, setTabActive] = useState<'following' | 'followers'>('following');

  const getFollowingAndFollower = async (userName: string) => {
    const [followers, following] = await Promise.all<dataType['followers'] | dataType['following']>([
      readData<dataType['followers']>(`/users/${userName}/followers`),
      readData<dataType['following']>(`/users/${userName}/following`),
    ]);
    return { followers, following };
  };

  const setFollowersAndFollowing = async (userName?: string) => {
    const usernameExtraction = username.startsWith('https://github.com/') ? username.split('/')[3] : username;
    const { followers, following } = await getFollowingAndFollower(userName ? userName : usernameExtraction);
    const followerLogins = followers.map((user) => user.login);
    const unFollowedUser = following.filter((user) => !followerLogins.includes(user.login));
    setData({
      followers,
      following,
    });
    setUnFollowed(unFollowedUser);
  };

  return (
    <main className="max-w-8xl w-full h-screen mt-3">
      <section className="w-full h-20 flex items-center justify-center flex-col px-10">
        <h2 className="text-2xl font-bold dark:text-white">آنالیز فالوور ها و فالووینگ ها</h2>
      </section>
      <section className="w-full flex flex-col items-start justify-between h-28 mt-3 px-8">
        <div className="w-full gap-x-4 flex">
          <input
            placeholder="یوزرنیم یا لینک گیت هاب کاربر مورد نظر خود را وارد کنید"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="w-5/6 h-12 rounded-xl px-3 placeholder:text-sm outline-none focus:ring-4 ring-light-400"
          />
          <Button
            onClick={() => setFollowersAndFollowing()}
            variant="light-400"
            className="w-1/6 text-xl font-semibold"
          >
            جستجو
            <RiSearch2Fill />
          </Button>
        </div>
        <div className="w-full flex gap-x-7">
          <Button
            onClick={() => setFollowersAndFollowing(session.data?.user.username)}
            variant="dark-400"
            className="text-lg w-1/2"
          >
            آنالیز صفحه شما
            <IoAnalytics className="text-2xl" />
          </Button>
          <Button variant="warning" className="text-lg text-black w-1/2">
            آنفالو خودکار
            <MdAutorenew className="text-xl" />
          </Button>
        </div>
      </section>
      <section className="flex items-center justify-between mt-5 w-full h-auto px-8 gap-x-7">
        <div className="w-1/3 h-96 rounded-xl bg-dark-300 border-[10px] border-dark-300 overflow-y-auto flex flex-wrap gap-3">
          {unFollowed.map(({ id, html_url, avatar_url, login }) => (
            <Link
              key={id}
              href={html_url}
              target="_blank"
              className="w-[31%] h-[185px] flex flex-col items-center justify-between p-1 text-white cursor-pointer text-lg bg-dark-400 rounded-lg"
            >
              <Image
                loading="lazy"
                width={96}
                height={50}
                src={avatar_url}
                alt={`${login} profile`}
                className="object-cover rounded-lg w-full"
              />
              <p dir="ltr" className="text-sm mt-1">
                {truncateText(login, 12)}
              </p>
              <Button className="h-7 text-sm w-full gap-x-1" variant="warning">
                آنفالو
                <RiUserUnfollowLine />
              </Button>
            </Link>
          ))}
        </div>
        <div className="w-2/3 h-96 rounded-xl bg-dark-300 border-[10px] border-b-1 border-dark-300 overflow-y-auto flex flex-wrap gap-3 relative">
          {(tabActive === 'followers' ? data.followers : data.following).map(({ id, html_url, avatar_url, login }) => (
            <Link
              key={id}
              href={html_url}
              target="_blank"
              className="w-[18.7%] flex flex-col items-center justify-between gap-y-2 p-[2px] text-white cursor-pointer text-lg bg-dark-400 rounded-lg"
            >
              <Image
                loading="lazy"
                width={96}
                height={50}
                src={avatar_url}
                alt={`${login} profile`}
                className="object-cover rounded-lg w-full"
              />
              <p dir="ltr" className="text-sm">
                {truncateText(login, 18)}
              </p>
            </Link>
          ))}
          <div className="w-full h-12 pt-2 flex items-center justify-around px-3 sticky bottom-0 bg-dark-300">
            <div className="w-4/6 flex items-center justify-center gap-x-2 text-white">
              <span className="hover:border border-light-400 bg-dark-400 text-sm cursor-pointer w-14 h-[34px] flex items-center justify-center rounded-md">
                بعد
              </span>
              <span className="w-5 pt-1 text-xl flex items-center justify-center">1</span>
              <span className="hover:border border-light-400 bg-dark-400 text-sm cursor-pointer w-14 h-[34px] flex items-center justify-center rounded-md">
                قبل
              </span>
            </div>
            <div className="w-2/6 flex items-center justify-end">
              <div className="bg-light-200 w-56 h-[34px] text-[15px] rounded-lg px-1 py-1 flex items-center justify-between">
                <span
                  className={`w-1/2 cursor-pointer flex justify-center pt-1 ${tabActive === 'followers' ? 'bg-dark-400 h-full rounded-md text-white font-bold' : ''}`}
                  onClick={() => setTabActive('followers')}
                >
                  followers
                </span>
                <span
                  className={`w-1/2 cursor-pointer flex justify-center pt-1 ${tabActive === 'following' ? 'bg-dark-400 h-full rounded-md text-white font-bold' : ''}`}
                  onClick={() => setTabActive('following')}
                >
                  following
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
