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
  commits: commitDataType[];
  branches: branchDataType[];
};

export type commitCardProps = Omit<commitDataType, 'sha'>;
