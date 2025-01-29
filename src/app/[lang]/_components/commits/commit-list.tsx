'use client';
import { useDictionary } from '@/providers/DictionaryProvider';
import { CommitCard } from './commit-card';
import { commitDataType, commitListProps } from './commit.types';
import { useEffect, useState } from 'react';
import { useGetCommits } from '@/hooks/useGetCommits';
import { Pagination } from '../pagination';
import { Branches } from '../branches';
import { CommitsPlaceholder } from '../placeholders/commits';

export const CommitList: React.FC<commitListProps> = ({ selectedRepo }) => {
  const [sha, setSha] = useState('');
  const [page, setPage] = useState(1);
  const { data: commits, isLoading } = useGetCommits({ owner: selectedRepo.owner, name: selectedRepo.name, sha, page });
  const data: commitDataType[] = commits?.data || [];
  const [commitSearch, setCommitSearch] = useState<commitDataType[] | []>([]);
  const dict = useDictionary();

  const url = commits?.config?.url || '';
  const pageMatch = url?.match(/page=(\d+)/);
  const currentPage = pageMatch ? parseInt(pageMatch[1]) : 0;
  const linkHeader = commits?.headers?.link || '';

  useEffect(() => {
    setCommitSearch(data);
  }, [commits]);

  const searchHandler = (value: string) => {
    if (value == '') {
      setCommitSearch(data);
    } else {
      const searchResult = data.filter((commit) => {
        return commit.commit.message.toLowerCase().includes(value.toLowerCase());
      });
      setCommitSearch(searchResult);
    }
  };

  const paginationHandler = async (direction: 'increment' | 'decrement') => {
    await setPage((prevPage) => (direction === 'increment' ? prevPage + 1 : prevPage - 1));
  };

  const filterHandler = async (value: string) => {
    await setPage(1);
    await setSha(value);
  };

  return (
    <>
      {isLoading ? (
        <CommitsPlaceholder />
      ) : (
        <div
          dir="ltr"
          className="md:w-3/5 w-full h-96 rounded-xl dark:bg-dark-300 bg-light-300 border-[5px] dark:border-dark-300 border-light-300 overflow-y-auto flex flex-wrap gap-3 p-2 pt-0"
        >
          {data.length == 0 ? (
            <div className="w-full font-semibold text-white h-full text-xl flex gap-y-1 flex-col items-center justify-center">
              <p>{dict.select_a_repository}</p>
              <p>{dict.no_activity_found}</p>
            </div>
          ) : (
            <>
              <div className="w-full md:h-14 sticky dark:bg-dark-300 bg-light-300 top-0 flex flex-col gap-y-2 pb-2 pt-1 md:pt-0 md:pb-0 md:flex-row items-center md:gap-x-4 gap-x-2">
                <input
                  onChange={(e) => searchHandler(e.target.value)}
                  type="search"
                  className="md:w-2/3 w-full h-10 rounded-lg px-2 placeholder:text-sm text-white dark:bg-dark-400 bg-light-400 placeholder:text-white"
                  placeholder="search..."
                />
                <Branches selectedRepo={selectedRepo} filterHandler={filterHandler} />
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
      )}
    </>
  );
};
