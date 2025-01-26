'use client';
import { useDictionary } from '@/providers/DictionaryProvider';
import { CommitCard } from './commit-card';
import { commitDataType, commitListProps } from './commit.types';
import { useEffect, useState } from 'react';
import { useGetCommits } from '@/hooks/useGetCommits';
import { Pagination } from '../pagination';

export const CommitList: React.FC<commitListProps> = ({ commits, branches, selectedRepo, linkHeader, currentPage }) => {
  const [commitSearch, setCommitSearch] = useState<commitDataType[] | []>([]);
  const [sha, setSha] = useState('');
  const [page, setPage] = useState(1);
  const { refetch } = useGetCommits(selectedRepo.owner, selectedRepo.name, sha, page);
  const dict = useDictionary();

  useEffect(() => {
    setCommitSearch(commits);
  }, [commits]);

  const searchHandler = (value: string) => {
    if (value == '') {
      setCommitSearch(commits);
    } else {
      const searchResult = commits.filter((commit) => {
        return commit.commit.message.toLowerCase().includes(value.toLowerCase());
      });
      setCommitSearch(searchResult);
    }
  };

  const paginationHandler = async (direction: 'increment' | 'decrement') => {
    await setPage((prevPage) => (direction === 'increment' ? prevPage + 1 : prevPage - 1));
    refetch();
  };

  const filterHandler = async (value: string) => {
    await setPage(1);
    await setSha(value);
    refetch();
  };

  return (
    <div
      dir="ltr"
      className="md:w-3/5 w-full h-96 rounded-xl dark:bg-dark-300 bg-light-300 border-[5px] dark:border-dark-300 border-light-300 overflow-y-auto flex flex-wrap gap-3 p-2 pt-0"
    >
      {commits.length == 0 ? (
        <div className="w-full font-semibold text-white h-full text-xl flex gap-y-1 flex-col items-center justify-center">
          <p>{dict.select_a_repository}</p>
          <p>{dict.no_activity_found}</p>
        </div>
      ) : (
        <>
          <div className="w-full md:h-14 sticky dark:bg-dark-300 bg-light-300 top-0 flex flex-col gap-y-2 pb-2 pt-1 md:pb-0 md:flex-row items-center md:gap-x-4 gap-x-2">
            <input
              onChange={(e) => searchHandler(e.target.value)}
              type="search"
              className="md:w-2/3 w-full h-10 rounded-lg px-2 placeholder:text-sm text-white dark:bg-dark-400 bg-light-400 placeholder:text-white"
              placeholder="search..."
            />
            <select
              onChange={(e) => filterHandler(branches.find((b) => b.name === e.target.value)?.commit.sha as string)}
              className="md:w-1/3 w-full h-10 px-1 rounded-lg text-sm dark:bg-dark-400 bg-light-400 text-white"
            >
              <option value="">یک برنچ انتخاب کنید</option>
              {branches.map(({ name, commit }) => (
                <option key={name + commit.sha} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-y-4 w-full min-h-56">
            {commitSearch.map(({ commit, sha, committer }) => (
              <CommitCard key={commit.message + sha} commit={commit} committer={committer} />
            ))}
          </div>
          <Pagination linkHeader={linkHeader} currentPage={currentPage} paginationHandler={paginationHandler} />
        </>
      )}
    </div>
  );
};
