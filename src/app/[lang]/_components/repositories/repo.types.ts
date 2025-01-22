export interface repoDataType {
  id: number;
  name: string;
  description: string;
  language: string;
  forks: number;
  stargazers_count: number;
  visibility: string;
  updated_at: string;
  owner: {
    login: string;
  };
}

export type repoCardProps = repoDataType & {
  repoHandler: (id: number, owner: { login: string }, name: string) => void;
  activeRepo: number | null;
};

export type repoListProps = {
  repositories: repoDataType[];
  repoHandler: (id: number, owner: { login: string }, name: string) => void;
  activeRepo: number | null;
};
