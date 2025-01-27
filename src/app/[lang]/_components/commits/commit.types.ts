import { commitAndPaginationData } from '@/types/commits.types';

export interface commitDataType {
  commit: {
    message: string;
    committer: {
      date: string;
    };
  };
  sha: string;
  committer: {
    login: string;
    avatar_url: string;
  };
}

export interface branchDataType {
  name: string;
  commit: {
    sha: string;
  };
}

export type commitListProps = {
  commits: commitAndPaginationData;
  branches: branchDataType[];
  selectedRepo: {
    owner: string;
    name: string;
  };
};

export type commitCardProps = Omit<commitDataType, 'sha'>;
