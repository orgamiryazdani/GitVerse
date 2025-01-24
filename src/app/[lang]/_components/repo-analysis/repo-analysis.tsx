'use client';
import { Button } from '../button';
import { useEffect, useState } from 'react';
import { IoAnalytics } from 'react-icons/io5';
import { RiSearch2Fill } from 'react-icons/ri';
import { useSession } from 'next-auth/react';
import { RepoList } from '../repositories';
import { CommitList } from '../commits';
import { useGetRepositories } from '@/hooks/useGetRepositories';
import { useGetCommits } from '@/hooks/useGetCommits';
import { useGetBranch } from '@/hooks/useGetBranch';
import toast from 'react-hot-toast';
import { RepoPlaceholder } from '../placeholders/repo';
import { CommitsPlaceholder } from '../placeholders/commits';
import { useDictionary } from '@/providers/DictionaryProvider';

export const RepoAnalysis: React.FC = () => {
  const session = useSession();
  const [username, setUsername] = useState('');
  const [usernameRepoValue, setUsernameRepoValue] = useState('');
  const [selectedRepo, setSelectedRepo] = useState({ name: '', owner: '' });
  const [activeRepo, setActiveRepo] = useState<number | null>(null);
  const dict = useDictionary();

  const {
    data: repositories,
    isLoading: repositoriesLoading,
    refetch: repositoriesRefetch,
  } = useGetRepositories(usernameRepoValue);

  const {
    data: branches,
    isLoading: branchesLoading,
    refetch: branchesRefetch,
  } = useGetBranch(selectedRepo.owner, selectedRepo.name);

  const {
    data: commits,
    isLoading: commitsLoading,
    refetch: commitsRefetch,
  } = useGetCommits(selectedRepo.owner, selectedRepo.name);

  useEffect(() => {
    if (repositories.length > 0) {
      repoHandler(repositories[0].id, repositories[0].owner, repositories[0].name);
    }
  }, [repositories]);

  const getUserRepos = async () => {
    const usernameExtraction = username.startsWith('https://github.com/') ? username.split('/')[3] : username;
    if (usernameExtraction == '') {
      toast.error(dict.please_enter_a_value);
      return;
    }
    await setUsernameRepoValue(usernameExtraction);
    repositoriesRefetch();
  };

  const getOwnerRepos = async () => {
    const ownerUsername = session.data?.user.username || '';
    if (ownerUsername == '') {
      toast.error(dict.please_log_in);
      return;
    }
    await setUsernameRepoValue(ownerUsername);
    repositoriesRefetch();
  };

  const getRepoBranches = async () => {
    branchesRefetch();
  };

  const getCommits = async () => {
    commitsRefetch();
  };

  const repoHandler = async (id: number, owner: { login: string }, name: string) => {
    await setSelectedRepo({
      name,
      owner: owner.login,
    });
    if (selectedRepo.name !== '' && selectedRepo.owner !== '') {
      getRepoBranches();
      getCommits();
    }
    setActiveRepo(id);
  };

  return (
    <main className="max-w-8xl w-full h-screen mt-3">
      <section className="w-full h-20 flex items-center justify-center flex-col px-10">
        <h2 className="md:text-2xl text-sm font-bold dark:text-white">{dict.repo_analysis_title}</h2>
      </section>
      <section className="w-full flex flex-col gap-y-3 items-start justify-between md:h-28 md:mt-3 md:px-8 px-5">
        <div className="w-full gap-x-4 gap-y-3 flex flex-col md:flex-row">
          <input
            placeholder={dict.repo_input_analysis_placeholder}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="md:w-5/6 w-full h-12 rounded-xl px-3 md:placeholder:text-sm placeholder:text-[10px]"
          />
          <Button
            onClick={getUserRepos}
            variant="light-400"
            className="md:w-1/6 md:min-w-40 w-full text-xl font-semibold text-white"
          >
            {dict.search_btn_text}
            <RiSearch2Fill />
          </Button>
        </div>
        <Button onClick={getOwnerRepos} variant="dark-400" className="text-lg w-full min-h-12">
          {dict.analysis_your_page_btn_text}
          <IoAnalytics className="text-2xl" />
        </Button>
      </section>
      <section className="flex items-center justify-between flex-col md:flex-row md:mt-5 mt-3 pb-5 md:pb-0 w-full h-auto md:px-8 px-5 gap-x-7 gap-y-5">
        {repositoriesLoading ? (
          <RepoPlaceholder />
        ) : (
          <RepoList repositories={repositories} repoHandler={repoHandler} activeRepo={activeRepo} />
        )}
        {commitsLoading ? <CommitsPlaceholder /> : <CommitList branches={branches} commits={commits} />}
      </section>
    </main>
  );
};
