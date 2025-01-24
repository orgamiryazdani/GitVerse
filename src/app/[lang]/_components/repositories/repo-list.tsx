import { useDictionary } from '@/providers/DictionaryProvider';
import { RepoCard } from './repo-card';
import { repoListProps } from './repo.types';

export const RepoList: React.FC<repoListProps> = ({ repositories, repoHandler, activeRepo }) => {
  const dict = useDictionary();

  return (
    <div
      dir="ltr"
      className="md:w-2/5 w-full h-96 rounded-xl dark:bg-dark-300 bg-light-300 border-[10px] dark:border-dark-300 border-light-300 overflow-y-auto flex flex-wrap gap-3"
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
    </div>
  );
};
