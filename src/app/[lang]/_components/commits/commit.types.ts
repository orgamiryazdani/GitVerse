export interface commitDataType {
  commit: {
    message: string;
    committer: {
      date: string;
    };
  };
  sha: string;
  html_url: string;
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
  selectedRepo: {
    owner: string;
    name: string;
  };
};

export type commitCardProps = commitDataType & {
  showModal: () => void;
};

export type commitActivityProps = {
  onClose: () => void;
  showModal: boolean;
};

export interface commitActivityData {
  data: {
    files: {
      filename: string;
      patch: string;
    }[];
    html_url: string;
  };
}
