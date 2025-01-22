import { RepoCard } from './repo-card';
import { repoListProps } from './repo.types';

export const RepoList: React.FC<repoListProps> = ({ repositories, repoHandler, activeRepo }) => {
  return (
    <div
      dir="ltr"
      className="w-2/5 h-96 rounded-xl bg-dark-300 border-[10px] border-dark-300 overflow-y-auto flex flex-wrap gap-3"
    >
      {repositories.map(
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
      )}
    </div>
  );
};
