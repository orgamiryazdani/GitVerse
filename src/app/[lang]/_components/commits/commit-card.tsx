import { formatDate } from '@/utils/formatDate';
import Image from 'next/image';
import { commitCardProps } from './commit.types';

export const CommitCard: React.FC<commitCardProps> = ({ commit, committer }) => {
  const avatarUrl = committer?.avatar_url || '/images/defaultuser.jpg';
  const committerLogin = committer?.login || 'Unknown User';
  const commitDate = commit?.committer?.date || new Date().toISOString();

  return (
    <div className="border-b dark:border-light-300 border-dark-400 pb-2 cursor-pointer">
      <p className="dark:text-white text-dark-100">{commit?.message || 'No commit message available'}</p>
      <div className="flex items-center gap-x-2 text-xs dark:text-white text-dark-300">
        <Image width={18} height={18} className="rounded-full object-contain" src={avatarUrl} alt={committerLogin} />
        <p>{committerLogin}</p>
        <span>{formatDate(commitDate, 'committed')}</span>
      </div>
    </div>
  );
};
