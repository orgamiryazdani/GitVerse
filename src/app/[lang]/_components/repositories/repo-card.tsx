import { formatDate } from '@/utils/formatDate';
import { FaCodeFork, FaRegStar } from 'react-icons/fa6';
import { repoCardProps } from './repo.types';

export const RepoCard: React.FC<repoCardProps> = ({
  id,
  name,
  description,
  language,
  owner,
  forks,
  stargazers_count,
  visibility,
  updated_at,
  repoHandler,
  activeRepo,
}) => {
  return (
    <div
      dir="ltr"
      key={id}
      onClick={() => repoHandler(id, owner, name)}
      className={`w-full h-auto cursor-pointer dark:bg-dark-400 bg-light-400 rounded-2xl mx-1 p-3 ${activeRepo === id ? 'border-2 dark:border-light-400 border-light-100' : ''}`}
    >
      <div className="flex items-center gap-x-3">
        <p className="dark:text-white text-dark-100 font-bold">{name}</p>
        <div className="border dark:border-light-300 border-dark-200 dark:text-light-300 text-dark-200 text-[11px] flex items-center justify-center h-5 w-12 rounded-2xl">
          {visibility}
        </div>
      </div>
      <p className="text-xs dark:text-light-300 text-dark-200 mt-1">{description}</p>
      <div className="flex w-full text-sm gap-x-3 dark:text-light-300 text-dark-200 mt-[10px]">
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
        <p>{formatDate(updated_at, 'Updated')}</p>
      </div>
    </div>
  );
};
