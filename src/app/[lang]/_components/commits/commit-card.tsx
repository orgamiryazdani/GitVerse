import { formatDate } from '@/utils/formatDate';
import Image from 'next/image';
import { commitCardProps } from './commit.types';
import { useRouter } from 'next/navigation';

export const CommitCard: React.FC<commitCardProps> = ({ commit, committer, showModal, sha, html_url }) => {
  const avatarUrl = committer?.avatar_url || '/images/defaultuser.jpg';
  const committerLogin = committer?.login || 'Unknown User';
  const commitDate = commit?.committer?.date || new Date().toISOString();
  const router = useRouter();

  const addQueryHandler = async (owner: string, sha: string, repoName: string) => {
    const parts = await repoName.split('/');
    await router.replace(`?owner=${owner}&sha=${sha}&repo=${parts[4]}`, { scroll: false });
    showModal();
  };

  return (
    <div
      onClick={() => addQueryHandler(committerLogin, sha, html_url)}
      className="border-b dark:border-light-300 border-dark-400 pb-2 cursor-pointer"
    >
      <p className="dark:text-white text-dark-100">{commit?.message || 'No commit message available'}</p>
      <div className="flex items-center gap-x-2 text-xs dark:text-white text-dark-300">
        <Image width={18} height={18} className="rounded-full object-contain" src={avatarUrl} alt={committerLogin} />
        <p>{committerLogin}</p>
        <span>{formatDate(commitDate, 'committed')}</span>
      </div>
    </div>
  );
};
