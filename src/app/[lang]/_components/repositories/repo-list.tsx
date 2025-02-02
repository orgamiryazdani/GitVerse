import { useDictionary } from '@/providers/dictionary-provider';
import { RepoCard } from './repo-card';
import { repoListProps } from './repo.types';
import { useGetRepositories } from '@/hooks/useGetRepositories';
import { RepoPlaceholder } from '../placeholders/repo';
import { useEffect, useState } from 'react';
import { Pagination } from '../pagination';
import { motion } from 'framer-motion';

export const RepoList: React.FC<repoListProps> = ({ usernameRepoValue, repoHandler, activeRepo }) => {
  const [page, setPage] = useState(1);
  const dict = useDictionary();
  const { data, isLoading } = useGetRepositories({ userName: usernameRepoValue, page });
  const repositories = data?.data || [];
  const [showAnimation, setShowAnimation] = useState(false);

  const url = data?.config?.url || '';
  const pageMatch = url?.match(/page=(\d+)/);
  const currentPage = pageMatch ? parseInt(pageMatch[1]) : 0;
  const linkHeader = data?.headers?.link || '';

  useEffect(() => {
    if (repositories.length > 0) {
      repoHandler(repositories[0].id, repositories[0].owner, repositories[0].name);
    }
  }, [repositories]);

  const paginationHandler = (direction: 'increment' | 'decrement') => {
    setPage((prevPage) => (direction === 'increment' ? prevPage + 1 : prevPage - 1));
  };

  useEffect(() => {
    if (showAnimation == false) {
      setShowAnimation(true);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <RepoPlaceholder />
      ) : (
        <motion.div
          initial={!showAnimation ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
          className="lg:w-2/5 w-full h-96 rounded-xl dark:bg-dark-300 bg-light-300 border-[10px] dark:border-dark-300 border-light-300 overflow-y-auto flex flex-wrap gap-3"
        >
          {repositories.length == 0 ? (
            <div className="flex flex-col gap-y-1 items-center justify-center font-semibold w-full h-full text-white">
              <p>{dict.please_search_for_a_user}</p>
              <p>{dict.no_repository_found}</p>
            </div>
          ) : (
            repositories.map(
              ({ id, name, description, language, owner, forks, stargazers_count, visibility, updated_at }) => (
                <RepoCard
                  key={id}
                  id={id}
                  name={name}
                  description={description}
                  language={language}
                  owner={owner}
                  forks={forks}
                  stargazers_count={stargazers_count}
                  visibility={visibility}
                  updated_at={updated_at}
                  repoHandler={repoHandler}
                  activeRepo={activeRepo}
                />
              )
            )
          )}
          <Pagination currentPage={currentPage} linkHeader={linkHeader} paginationHandler={paginationHandler} />
        </motion.div>
      )}
    </>
  );
};
