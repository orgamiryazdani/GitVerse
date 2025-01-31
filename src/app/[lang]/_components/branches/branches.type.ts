export type branchesProps = {
  selectedRepo: {
    owner: string;
    name: string;
  };
  selectedBrach: string;
  filterHandler: (sha: string, name: string) => void;
};
