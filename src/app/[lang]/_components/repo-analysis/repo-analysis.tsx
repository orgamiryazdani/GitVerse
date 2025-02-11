'use client';
import { Button } from '../button';
import { useState } from 'react';
import { IoAnalytics } from 'react-icons/io5';
import { RiSearch2Fill } from 'react-icons/ri';
import { useSession } from 'next-auth/react';
import { RepoList } from '../repositories';
import { CommitList } from '../commits';
import toast from 'react-hot-toast';
import { useDictionary } from '@/providers/dictionary-provider';
import { motion } from 'framer-motion';

type motionWrapperProps = {
  children: React.ReactNode;
  className?: string;
  duration: number;
};

const MotionWrapper = ({ children, className = '', duration }: motionWrapperProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.6 }}
  >
    {children}
  </motion.div>
);

export const RepoAnalysis: React.FC = () => {
  const session = useSession();
  const [username, setUsername] = useState('');
  const [usernameRepoValue, setUsernameRepoValue] = useState('');
  const [selectedRepo, setSelectedRepo] = useState({ name: '', owner: '' });
  const [activeRepo, setActiveRepo] = useState<number | null>(null);
  const dict = useDictionary();

  const getUserRepos = async () => {
    const usernameExtraction = username.startsWith('https://github.com/') ? username.split('/')[3] : username;
    if (usernameExtraction == '') {
      toast.error(dict.please_enter_a_value);
      return;
    }
    await setUsernameRepoValue(usernameExtraction);
  };

  const getOwnerRepos = async () => {
    const ownerUsername = session.data?.user.username || '';
    if (ownerUsername == '') {
      toast.error(dict.please_log_in);
      return;
    }
    await setUsernameRepoValue(ownerUsername);
  };

  const repoHandler = async (id: number, owner: { login: string }, name: string) => {
    await setSelectedRepo({
      name,
      owner: owner.login,
    });
    setActiveRepo(id);
  };

  return (
    <main id="repo-analysis" className="max-w-8xl w-full h-screen mt-3">
      <section className="w-full h-20 flex items-center justify-center flex-col px-10">
        <h2 className="md:text-2xl text-sm font-bold dark:text-white">{dict.repo_analysis_title}</h2>
      </section>
      <section className="w-full flex flex-col gap-y-3 items-start justify-between md:h-28 md:mt-3 md:px-8 px-5">
        <div className="w-full gap-x-4 gap-y-3 flex flex-col md:flex-row">
          <MotionWrapper className="md:w-5/6 w-full" duration={0.4}>
            <input
              placeholder={dict.repo_input_analysis_placeholder}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="w-full h-12 rounded-xl px-3 md:placeholder:text-sm placeholder:text-[10px]"
            />
          </MotionWrapper>
          <MotionWrapper className="md:w-1/6 md:min-w-40 w-full" duration={0.5}>
            <Button onClick={getUserRepos} variant="light-400" className="w-full text-xl font-semibold text-white">
              {dict.search_btn_text}
              <RiSearch2Fill />
            </Button>
          </MotionWrapper>
        </div>
        <MotionWrapper className="w-full" duration={0.2}>
          <Button onClick={getOwnerRepos} variant="dark-400" className="text-lg w-full min-h-12">
            {dict.analysis_your_page_btn_text}
            <IoAnalytics className="text-2xl" />
          </Button>
        </MotionWrapper>
      </section>
      <section className="flex items-center justify-between flex-col lg:flex-row lg:mt-5 mt-3 pb-5 lg:pb-0 w-full h-auto lg:px-8 px-5 gap-x-7 gap-y-5">
        <RepoList usernameRepoValue={usernameRepoValue} repoHandler={repoHandler} activeRepo={activeRepo} />
        <CommitList selectedRepo={selectedRepo} />
      </section>
    </main>
  );
};
