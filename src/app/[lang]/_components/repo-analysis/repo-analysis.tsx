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

export const RepoAnalysis: React.FC = () => {
  const session = useSession();
  const [username, setUsername] = useState('');
  const [usernameRepoValue, setUsernameRepoValue] = useState('');
  const [selectedRepo, setSelectedRepo] = useState({ name: '', owner: '' });
  const [activeRepo, setActiveRepo] = useState<number | null>(null);

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
      toast.error('لطفا مقداری وارد کنید');
      return;
    }
    await setUsernameRepoValue(usernameExtraction);
    repositoriesRefetch();
  };

  const getOwnerRepos = async () => {
    const ownerUsername = session.data?.user.username || '';
    if (ownerUsername == '') {
      toast.error('لطفا وارد شوید');
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
        <h2 className="text-2xl font-bold dark:text-white">آنالیز ریپازیتوری ها و فعالیت های کاربر</h2>
      </section>
      <section className="w-full flex flex-col items-start justify-between h-28 mt-3 px-8">
        <div className="w-full gap-x-4 flex">
          <input
            placeholder="یوزرنیم یا لینک گیت هاب کاربر مورد نظر خود را وارد کنید"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="w-5/6 h-12 rounded-xl px-3 placeholder:text-sm"
          />
          <Button onClick={getUserRepos} variant="light-400" className="w-1/6 text-xl font-semibold">
            جستجو
            <RiSearch2Fill />
          </Button>
        </div>
        <Button onClick={getOwnerRepos} variant="dark-400" className="text-lg w-full">
          آنالیز صفحه شما
          <IoAnalytics className="text-2xl" />
        </Button>
      </section>
      <section className="flex items-center justify-between mt-5 w-full h-auto px-8 gap-x-7">
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
